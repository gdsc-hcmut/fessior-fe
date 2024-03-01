import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties } from 'react';

const Loading = () => {
  const style: CSSProperties = {
    height: 'auto',
    width: '16vw',
    aspectRatio: 1,
  };
  const options: LottieOptions<'svg'> = {
    animationData: require('../../../public/animations/Loading.json'),
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div className='flex h-[60vh] w-full items-center justify-center'>
      {View}
    </div>
  );
};

export default Loading;
