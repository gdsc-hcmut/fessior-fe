import Category from '@/types/category-type';

type CategoryItemProps = { category: Category; onClick: () => void };

export default function CategoryItem(props: CategoryItemProps) {
  const { category, onClick } = props;
  return (
    <div className='mx-[2px] inline-flex items-center rounded-[8px] bg-primary px-[8px] py-[4px] align-middle text-[12px] text-white md:mx-[4px] md:px-[12px] md:py-[8px] lg:text-[16px]'>
      <div
        style={{ backgroundColor: category.color }}
        className='me-[8px] aspect-square w-[12px] rounded-full'
      ></div>
      <p>
        <span className='me-[4px] inline-block max-w-[40px] truncate align-middle md:max-w-[64px] lg:max-w-[100px]'>
          {category.name}
        </span>
        <span
          onClick={onClick}
          className='align-middle text-[12px] hover:cursor-pointer hover:text-[#cccccc] md:text-[16px]'
        >
          &#10005;
        </span>
      </p>
    </div>
  );
}
