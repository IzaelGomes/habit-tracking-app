import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../assistant';

export const useChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => sendMessage(message),
    onSuccess: () => {
      // Invalidate and refetch chat history after sending a message
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });
};
