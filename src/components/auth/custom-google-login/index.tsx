import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useRef, useState, useEffect } from 'react';

export default function CustomGoogleLogin({
  onSuccess,
}: {
  onSuccess: (credential: CredentialResponse) => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    setButtonWidth(ref.current ? ref.current.offsetWidth : 0);
  }, []);

  return (
    <div className='w-[100%]' ref={ref}>
      <GoogleLogin
        size='large'
        onSuccess={onSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
        width={buttonWidth}
      />
    </div>
  );
}
