import { useQuery } from '@tanstack/react-query';
import { getHeatmapData } from '../stats';

export const useHeatmapData = () => {
  return useQuery({
    queryKey: ['stats', 'heatmap'],
    queryFn: getHeatmapData,
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: true,
  });
};
