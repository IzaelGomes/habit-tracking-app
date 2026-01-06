import api from '../config/api';

export interface Habit {
  id: string;
  name: string;
  weekDays: number[];
  createdAt: string;
  updatedAt: string;
  isCompleted?: boolean;
}

export interface GetHabitsResponse {
  habits: Habit[];
  total: number;
}

export interface CreateHabitRequest {
  name: string;
  weekDays: number[];
  createdAt: string;
}

export interface CreateHabitResponse {
  message: string;
  habit: Habit;
}

export const getUserHabits = async (): Promise<GetHabitsResponse> => {
  const response = await api.get<GetHabitsResponse>('/habits');
  return response.data;
};

export const getDailyHabits = async (date: string): Promise<GetHabitsResponse> => {
  const response = await api.get<GetHabitsResponse>('/habits', {
    params: { date },
  });
  return response.data;
};

export const createHabit = async (
  name: string,
  weekDays: number[]
): Promise<CreateHabitResponse> => {
  const response = await api.post<CreateHabitResponse>('/habits', {
    name,
    weekDays,
    createdAt: new Date().toISOString(),
  } as CreateHabitRequest);
  return response.data;
};

