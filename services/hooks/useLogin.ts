import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../auth';

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      loginUser(username, password),
    onSuccess: async (data) => {
      await login(data.user, data.accessToken);
    },
  });
};

