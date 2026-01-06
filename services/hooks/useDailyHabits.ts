import { useQuery } from '@tanstack/react-query';
import { getDailyHabits } from '../habits';

export const useDailyHabits = (date: string) => {
  return useQuery({
    queryKey: ['dailyHabits', date],
    queryFn: () => getDailyHabits(date),
    enabled: !!date,
  });
};

