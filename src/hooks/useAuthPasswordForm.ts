import { useState, useContext, useEffect } from 'react';

import AuthFormContext from '@/contexts/authFormContext';
import { validatePassword } from '@/utils/auth';

import { useInputErrorText } from './useInputErrorText';

export function useAuthPasswordForm(
  formFieldNumber: number = 3,
  confirmPasswordFieldIndex: number = 2,
) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActionAllowed, setIsActionAllowed] = useState(false);
  const [modalErrorText, setModalErrorText] = useState<string | null>(null);
  const { setIsAuthErrorModalVisible } = useContext(AuthFormContext);

  const { inputErrorTexts, setInputErrorText } =
    useInputErrorText(formFieldNumber);

  useEffect(() => {
    if (!validatePassword(password).includes(false)) setIsActionAllowed(true);
    else setIsActionAllowed(false);
  }, [password, confirmPassword, setInputErrorText]);

  useEffect(() => {
    setInputErrorText(confirmPasswordFieldIndex, '');
  }, [confirmPassword, setInputErrorText, confirmPasswordFieldIndex]);

  useEffect(() => {
    setIsAuthErrorModalVisible(!!modalErrorText);
  }, [modalErrorText, setIsAuthErrorModalVisible]);

  const handleDifferentConfirmPassword = () => {
    setInputErrorText(confirmPasswordFieldIndex, 'Password does not match');
    setIsActionAllowed(false);
  };

  return {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    isActionAllowed,
    modalErrorText,
    setModalErrorText,
    inputErrorTexts,
    handleDifferentConfirmPassword,
  };
}
