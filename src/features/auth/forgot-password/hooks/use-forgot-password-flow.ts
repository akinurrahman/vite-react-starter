import { useNavigate, useSearchParams } from 'react-router-dom';

import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/error';

import { useForgotPasswordStore } from '../store/store';
import type {
  ForgotPasswordRequestOtpInput,
  ForgotPasswordResetPasswordInput,
} from '../validators/forgot-password.schema';
import {
  useForgotPasswordRequestOtp,
  useForgotPasswordReset,
  useForgotPasswordVerifyOtp,
} from './use-forgot-password';

export function useForgotPasswordFlow() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { email, setEmail, resetToken, setResetToken, clear } = useForgotPasswordStore();

  const step = Number(searchParams.get('step') ?? '1');

  const setStep = (newStep: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set('step', newStep.toString());
      return params;
    });
  };

  const requestOtp = useForgotPasswordRequestOtp();
  const verifyOtp = useForgotPasswordVerifyOtp();
  const resetPassword = useForgotPasswordReset();

  const handleRequestOtp = async (data: ForgotPasswordRequestOtpInput) => {
    await requestOtp.mutateAsync(data);
    setEmail(data.email);
    setStep(2);
  };

  const resendOtp = async () => {
    if (!email) return;

    try {
      await requestOtp.mutateAsync({ email });
      toast.success('OTP sent again.');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleVerifyOtp = async (data: { email: string; otp: string }) => {
    const res = await verifyOtp.mutateAsync(data);
    setResetToken(res.data.resetToken);
    setStep(3);
  };

  const handleResetPassword = async (data: ForgotPasswordResetPasswordInput) => {
    try {
      if (!resetToken) throw new Error('Reset token missing');
      await resetPassword.mutateAsync({ ...data, resetToken });
      clear();
      toast.success('Password reset successful. Please log in with your new password.');
      navigate('/login');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    step,
    email,
    resetToken,

    mutations: {
      requestOtp,
      verifyOtp,
      resetPassword,
    },

    actions: {
      handleRequestOtp,
      handleVerifyOtp,
      handleResetPassword,
      resendOtp,
    },
  };
}
