import { useQuery } from '@tanstack/react-query';
import { getWeeklyStats } from '../stats';

export const useWeeklyStats = () => {
  return useQuery({
    queryKey: ['stats', 'weekly'],
    queryFn: getWeeklyStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};
