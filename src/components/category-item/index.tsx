type CategoryItemProps = {
  text: string;
};

export default function CategoryItem(props: CategoryItemProps) {
  const { text } = props;
  return (
    <p className='mx-[2px] inline rounded-[8px] bg-primary px-[8px] py-[4px] align-middle text-[12px] text-white md:mx-[4px] md:px-[12px] md:py-[8px] lg:text-[16px]'>
      {text}{' '}
      <span className='align-middle text-[12px] hover:cursor-pointer hover:text-[#cccccc] md:text-[16px]'>
        &#10005;
      </span>
    </p>
  );
}
