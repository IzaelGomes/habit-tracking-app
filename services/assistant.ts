import api from '../config/api';
import { ChatHistoryResponse, ChatResponse } from '../types/interfaces';

export interface SendMessageRequest {
  message: string;
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/assistant', {
    message,
  });
  return response.data;
};

export const getChatHistory = async (): Promise<ChatHistoryResponse[]> => {
  const response = await api.get<ChatHistoryResponse[]>('/assistant/history');
  return response.data;
};
