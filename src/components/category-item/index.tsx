type CategoryItemProps = {
  text: string;
};

export default function CategoryItem(props: CategoryItemProps) {
  const { text } = props;
  return (
    <p className='inline rounded-[8px] bg-primary px-[12px] py-[4px] align-middle text-[12px] leading-[35px] text-white'>
      {text}{' '}
      <span className='ml-1 align-middle text-[8px] hover:cursor-pointer hover:text-[#cccccc]'>
        &#10005;
      </span>
    </p>
  );
}
