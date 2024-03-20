import Image from 'next/image';

type QrHomeButtonProps = {
  type: string;
  image: string;
  content: string;
};

export default function QrHomeButton(props: QrHomeButtonProps) {
  const { type, image, content } = props;
  return (
    <button
      className=' md:pr-45 ld:pr-37 flex w-full rounded-lg border-[0.5px] border-solid border-black bg-white pl-4
      pr-8 shadow-[0_20px_20px_0px_rgba(11,40,120,0.2)] md:pl-6 lg:pl-5'
    >
      <div className='flex py-1 md:py-5'>
        <Image src={image} alt='qr-icon' height={60} width={60} />
        <div className='my-3 ml-3 flex flex-col text-left md:ml-5 md:pl-0'>
          <h1 className='text-[20px] font-bold text-black md:text-[24px]'>
            {type}
          </h1>
          <p className='text-[16px] font-normal text-black/[0.6] md:text-[20px]'>
            {content}
          </p>
        </div>
      </div>
    </button>
  );
}
