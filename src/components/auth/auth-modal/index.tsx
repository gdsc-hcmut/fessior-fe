import { useContext, useEffect, useState } from 'react';

import CloseButton from '@/components/close-button';
import AuthContext from '@/contexts/authContext';
import AuthFormContext from '@/contexts/authFormContext';
import { useAuthRouter, useEventListener } from '@/hooks';
import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';
import { detectOS } from '@/utils/common';

import AuthModalContentProvider from '../auth-modal-content-provider';

type AuthModalProps = {
  authType: AuthType;
};

export default function AuthModal(props: AuthModalProps) {
  const { authType } = props;
  const [isAuthAllowed, setIsAuthAllowed] = useState(false);
  const { isAuthErrorModalVisible } = useContext(AuthFormContext);
  const { isLoggedIn, isAuthStatusReady } = useContext(AuthContext);
  const authRouter = useAuthRouter();

  useEffect(() => {
    const isMobile = !['windows', 'other'].includes(detectOS());
    if (isMobile) authRouter(authType);

    if (authType === AuthType.SIGN_UP) {
      setIsAuthAllowed(true);
      return;
    }

    if (isAuthStatusReady) {
      if (isLoggedIn) {
        authRouter();
      } else setIsAuthAllowed(true);
    }
  }, [authRouter, isAuthStatusReady, isLoggedIn, authType]);

  useEventListener('keydown', (e: any) => {
    if (e.key === 'Escape' && !isAuthErrorModalVisible) authRouter();
  });

  if (!authType || !isAuthAllowed) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/[0.3]'>
      <div className='relative flex w-[560px] items-stretch overflow-hidden rounded-[8px] bg-white lg:w-[680px]'>
        <div className='flex w-[65%] flex-col px-[40px] py-[60px]'>
          <AuthModalContentProvider authType={authType} />
        </div>
        <div
          style={{
            backgroundImage: `url("${authHeaderContent[authType][0].background}")`,
          }}
          className='flex-grow bg-cover bg-center'
        ></div>
        <CloseButton
          onClick={() => {
            authRouter();
          }}
          className='absolute right-[16px] top-[16px] w-[32x]'
        />
      </div>
    </div>
  );
}
