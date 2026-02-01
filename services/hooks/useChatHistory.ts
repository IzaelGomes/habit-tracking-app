import { useQuery } from '@tanstack/react-query';
import { getChatHistory } from '../assistant';

export const useChatHistory = () => {
  return useQuery({
    queryKey: ['chatHistory'],
    queryFn: () => getChatHistory(),
  });
};
