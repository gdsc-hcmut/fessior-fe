// "Esc" keydown event is currently causing BOTH the Error Modal and the Auth Modal to close, (e.stopPropagation() is not working with the current components structure)
// This context will enable the Auth Modal to know when the Error Modal is visible, the Esc event of Auth Modal will be canceled.

'use client';

import { createContext, ReactNode, useState, useMemo } from 'react';

type AuthFormContextProps = {
  isAuthErrorModalVisible: boolean | null;
  setIsAuthErrorModalVisible: (error: boolean) => void;
};

const AuthFormContext = createContext({} as AuthFormContextProps);

export function AuthFormContextProvider({ children }: { children: ReactNode }) {
  const [isAuthErrorModalVisible, setIsAuthErrorModalVisible] = useState<
    boolean | null
  >(null);

  const value = useMemo(() => {
    return { isAuthErrorModalVisible, setIsAuthErrorModalVisible };
  }, [isAuthErrorModalVisible, setIsAuthErrorModalVisible]);

  return (
    <AuthFormContext.Provider value={value}>
      {children}
    </AuthFormContext.Provider>
  );
}

export default AuthFormContext;
