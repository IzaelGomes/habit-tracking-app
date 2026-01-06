import api from '../config/api';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/signin', {
    username,
    password,
  });
  return response.data;
};

