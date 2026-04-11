import { AxiosError } from 'axios';

export const getErrorMessage = (
  error: unknown,
  fallback: string = 'Something went wrong'
): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
};

export const getErrorDetails = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.status || error.status,
      message: error.response?.data?.message || error.message || 'Request failed',
      error: error.response?.data?.error || error.code || 'UNKNOWN_ERROR',
      data: error.response?.data,
      config: error.config,
    };
  }
  if (error instanceof Error) {
    return { status: null, message: error.message, error: error.name, data: null, config: null };
  }
  return {
    status: null,
    message: 'Unknown error occurred',
    error: 'UNKNOWN_ERROR',
    data: null,
    config: null,
  };
};
