import api from '../config/api';

export interface Tracking {
  id: string;
  habitId: string;
  completedDate: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ToggleTrackingRequest {
  habitId: string;
  completedDate: string;
  checked: boolean;
}

export interface ToggleTrackingResponse {
  message: string;
  tracking: Tracking;
}

export const toggleHabitTracking = async (
  habitId: string,
  completedDate: string,
  checked: boolean
): Promise<ToggleTrackingResponse> => {
  const response = await api.post<ToggleTrackingResponse>('/tracking', {
    habitId,
    completedDate,
    checked,
  } as ToggleTrackingRequest);
  return response.data;
};

