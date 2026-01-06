import { useQuery } from '@tanstack/react-query';
import { getUserHabits } from '../habits';

export const useHabitsCount = () => {
  return useQuery({
    queryKey: ['habits'],
    queryFn: getUserHabits,
    select: (data) => data.total,
  });
};

