import Image from 'next/image';

type ToolItemProps = {
  imgSrc: string;
  imgAlt: string;
  name: string;
  desc: string;
};

export default function ToolItem(props: ToolItemProps) {
  const { imgSrc, imgAlt, name, desc } = props;
  return (
    <div className='my-[80px] flex flex-col content-end items-center'>
      <div className='flex items-center'>
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={0}
          height={0}
          className='h-auto min-h-[60px] w-auto'
        />
      </div>
      <h4 className='mb-[8px] mt-[20px] text-[24px] font-[700] leading-[40px]'>
        {name}
      </h4>
      <p className='max-w-[300px] text-center leading-[24px] text-black'>
        {desc}
      </p>
    </div>
  );
}
