import { useQuery } from '@tanstack/react-query';
import { getTodayStats } from '../stats';

export const useTodayStats = () => {
  return useQuery({
    queryKey: ['stats', 'today'],
    queryFn: getTodayStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
    refetchOnWindowFocus: true,
  });
};
