type CategoryItemProps = {
  text: string;
};

export default function CategoryItem(props: CategoryItemProps) {
  const { text } = props;
  return (
    <p className='mx-[2px] inline rounded-[20px] bg-primary px-[8px] py-[2px] align-middle text-[12px] text-white'>
      {text}{' '}
      <span className='align-middle text-[8px] hover:cursor-pointer hover:text-[#cccccc]'>
        &#10005;
      </span>
    </p>
  );
}
