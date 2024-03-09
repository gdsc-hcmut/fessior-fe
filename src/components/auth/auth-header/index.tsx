import Image from 'next/image';

import Brand from '@/components/brand';
import useAuthRouter from '@/hooks/useAuthRouter';
import AuthType from '@/types/auth-type-enum';

type AuthHeaderProps = {
  title: string;
  subtitle?: string;
  background: string;
  sublinkText?: string;
  sublinkAuthType?: AuthType;
};

export default function AuthHeader(props: AuthHeaderProps) {
  const { title, subtitle, sublinkAuthType, sublinkText, background } = props;
  const authRouter = useAuthRouter();

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className='relative flex max-h-[50%] min-h-[300px] flex-grow flex-col bg-cover p-[20px]'
    >
      <Brand theme='white' />
      <div className='flex flex-grow flex-col justify-center'>
        <h1 className='text-[28px] font-[700] text-white'>{title}</h1>
        <p className='text-white'>
          {subtitle}{' '}
          {sublinkAuthType && sublinkText && (
            <span
              className='underline'
              onClick={() => {
                authRouter(sublinkAuthType);
              }}
            >
              {sublinkText}
            </span>
          )}
        </p>
      </div>
      <Image
        src='/images/auth/decor.svg'
        alt='background'
        width={0}
        height={0}
        className='absolute bottom-0 left-0 right-0 h-auto w-[100%]'
      />
    </div>
  );
}
