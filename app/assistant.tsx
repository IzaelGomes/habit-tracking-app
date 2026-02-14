import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { useChat } from '../services/hooks/useChat';
import { useChatHistory } from '../services/hooks/useChatHistory';
import { ChatMessage as ChatMessageType } from '../types/interfaces';

export default function AssistantScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { data: chatHistory, isLoading: isLoadingHistory, error: historyError } = useChatHistory();
  console.log('chatHistory', chatHistory);
  const chatMutation = useChat();

  // Convert chat history to messages format and update local state
  useEffect(() => {
    if (chatHistory) {
      const formattedMessages: ChatMessageType[] = chatHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
        createdAt: msg.createdAt,
      }));
      setMessages(formattedMessages);
    }
  }, [chatHistory]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSendMessage = (messageText: string) => {
    // Optimistically add user message
    const userMessage: ChatMessageType = {
      role: 'USER',
      content: messageText,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send message to API
    chatMutation.mutate(messageText, {
      onSuccess: (response) => {
        // Add assistant response
        const assistantMessage: ChatMessageType = {
          role: 'ASSISTANT',
          content: response.message,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      },
      onError: (error: any) => {
        // Remove optimistic user message on error
        setMessages((prev) => prev.filter((msg, index) => index !== prev.length - 1));
        Alert.alert(
          'Error',
          error?.message || error?.response?.data?.message || 'Failed to send message. Please try again.'
        );
      },
    });
  };

  if (historyError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load chat history</Text>
          <Text style={styles.errorSubtext}>Please try again later</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Assistant</Text>
        </View>

        {isLoadingHistory ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading chat history...</Text>
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Start a conversation</Text>
            <Text style={styles.emptySubtext}>
              Ask me anything about your habits and tracking!
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => `${item.role}-${index}-${item.createdAt}`}
            renderItem={({ item }) => (
              <ChatMessage message={item} isUser={item.role === 'USER'} />
            )}
            contentContainerStyle={styles.messagesContainer}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
            onLayout={() => {
              flatListRef.current?.scrollToEnd({ animated: false });
            }}
          />
        )}

        <ChatInput
          onSend={handleSendMessage}
          isLoading={chatMutation.isPending}
          disabled={isLoadingHistory}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  messagesContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
