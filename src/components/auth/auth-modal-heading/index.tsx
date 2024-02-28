import { clsx } from 'clsx';

import useAuthRouter from '@/hooks/useAuthRouter';

type AuthModalHeadingProps = {
  title: string;
  subtitle?: string;
  sublinkText?: string;
  sublinkAuthType?: string;
  className?: string;
};

export function AuthModalHeading(props: AuthModalHeadingProps) {
  const { title, subtitle, sublinkAuthType, sublinkText, className } = props;

  const authRouter = useAuthRouter();

  return (
    <div className={clsx('md:mb-[24px] lg:mb-[28px]', className)}>
      {
        <h1 className='font-[700] text-primary md:text-[28px] lg:text-[32px]'>
          {title}
        </h1>
      }
      <p>
        {subtitle}{' '}
        {sublinkAuthType && sublinkText && (
          <span
            className='cursor-pointer text-primary underline'
            onClick={() => authRouter(sublinkAuthType)}
          >
            {sublinkText}
          </span>
        )}
      </p>
    </div>
  );
}
