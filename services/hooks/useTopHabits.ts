import { useQuery } from '@tanstack/react-query';
import { getTopHabits } from '../stats';

export const useTopHabits = () => {
  return useQuery({
    queryKey: ['stats', 'top-habits'],
    queryFn: getTopHabits,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
};
