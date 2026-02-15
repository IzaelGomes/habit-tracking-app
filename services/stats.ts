import api from '../config/api';

export interface WeeklyStats {
  dates: string[];
  completionRates: number[];
  completedCounts: number[];
  totalCounts: number[];
}

export interface TodayStats {
  completed: number;
  total: number;
  percentage: number;
}

export interface TopHabit {
  name: string;
  completionRate: number;
}

export interface HeatmapData {
  date: string;
  count: number;
}

export const getWeeklyStats = async (): Promise<WeeklyStats> => {
  const response = await api.get<WeeklyStats>('/tracking/stats/weekly');
  return response.data;
};

export const getTodayStats = async (): Promise<TodayStats> => {
  const response = await api.get<TodayStats>('/tracking/stats/today');
  return response.data;
};

export const getTopHabits = async (): Promise<TopHabit[]> => {
  const response = await api.get<TopHabit[]>('/tracking/stats/top-habits');
  return response.data;
};

export const getHeatmapData = async (): Promise<HeatmapData[]> => {
  const response = await api.get<HeatmapData[]>('/tracking/stats/heatmap');
  return response.data;
};
