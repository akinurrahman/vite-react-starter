import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/lib/api/api-call';
import { useAuthStore } from '@/stores/auth.store';

import { type AuthResponse } from '../types/auth.types';
import { type LoginInput } from '../validators/auth.schema';

export const useLogin = () => {
  return useMutation<AuthResponse, unknown, LoginInput>({
    mutationFn: payload => apiCall(`/auth/login`, payload, 'POST'),
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const refreshToken = useAuthStore(s => s.refreshToken);
  const logout = useAuthStore(s => s.logout);

  return useMutation({
    mutationFn: () => apiCall('/auth/logout', { refreshToken }, 'POST'),
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });
};
