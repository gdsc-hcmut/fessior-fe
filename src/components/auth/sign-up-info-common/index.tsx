import { CredentialResponse } from '@react-oauth/google';
import { useContext } from 'react';

import AuthContext from '@/contexts/authContext';
import { useAuthRouter } from '@/hooks';
import AuthType from '@/types/auth-type-enum';

import CustomGoogleLogin from '../custom-google-login';

export default function SignUpInfoCommon() {
  const { login } = useContext(AuthContext);
  const authRouter = useAuthRouter();

  const handleSignUpWithGoogle = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (credentialResponse.credential) {
      try {
        const response = await login({
          token: credentialResponse.credential,
        });
        if (response.isFirstLogin) {
          authRouter(AuthType.SIGN_UP);
        } else {
          authRouter();
        }
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      <p className='mb-[8px] font-[600]'>
        Create an account in just a few steps!
      </p>
      <ul className='mb-[40px] list-inside list-disc lg:mb-[60px]'>
        <li className='text-[14px] leading-relaxed'>
          <span className='relative left-[-8px]'>
            Log in with your Google account
          </span>
        </li>
        <li className='text-[14px] leading-relaxed'>
          <span className='relative left-[-8px]'>
            Once logged in, your account email will be automatically set as your
            username
          </span>
        </li>
        <li className='text-[14px] leading-relaxed'>
          <span className='relative left-[-8px]'>
            Complete the process by entering the password you want to create
          </span>
        </li>
      </ul>
      <CustomGoogleLogin onSuccess={handleSignUpWithGoogle} />
    </>
  );
}
