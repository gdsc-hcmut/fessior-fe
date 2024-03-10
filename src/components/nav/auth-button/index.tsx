import { clsx } from 'clsx';

import useAuthRouter from '@/hooks/useAuthRouter';
import AuthType from '@/types/auth-type-enum';

type AuthButtonProps = {
  isHome?: boolean;
  isLogin?: boolean;
  className?: string;
};

export default function AuthButton(props: AuthButtonProps) {
  const { isHome, isLogin, className } = props;

  const authRouter = useAuthRouter();

  const buttonClass = clsx(
    'h-[30px] md:h-[36px] lg:px-[24px] transition-all duration-100 lg:h-[44px] rounded-[16px] md:rounded-full border-[1px] px-[20px] text-center align-middle text-[12px] md:text-[16px] font-[500] tracking-[0.32px]',
    isHome
      ? isLogin
        ? 'text-white bg-primary border-white hover:bg-primary-darken'
        : 'text-primary bg-white border-primary hover:bg-primary-white'
      : isLogin
      ? 'text-primary bg-white border-primary hover:bg-primary-white'
      : 'text-white bg-primary border-primary hover:bg-primary-darken',
    className,
  );

  return (
    <button
      onClick={() => {
        authRouter(isLogin ? AuthType.LOGIN : AuthType.SIGN_UP_INFO);
      }}
      className={buttonClass}
    >
      {isLogin ? 'Log in' : 'Sign up'}
    </button>
  );
}
