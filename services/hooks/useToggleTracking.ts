import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleHabitTracking } from '../tracking';

export const useToggleTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      habitId,
      completedDate,
      checked,
    }: {
      habitId: string;
      completedDate: string;
      checked: boolean;
    }) => toggleHabitTracking(habitId, completedDate, checked),
    onSuccess: () => {
      // Invalidate daily habits query to refetch with updated status
      queryClient.invalidateQueries({ queryKey: ['dailyHabits'] });
    },
  });
};

