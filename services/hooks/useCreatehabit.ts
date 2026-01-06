import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHabit } from '../habits';

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, weekDays }: { name: string; weekDays: number[] }) =>
      createHabit(name, weekDays),
    onSuccess: () => {
      // Invalidate and refetch habits list
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });
};

