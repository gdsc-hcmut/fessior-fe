import Image from 'next/image';

import Category from '@/types/category-type';
import ShortenInputFieldType from '@/types/shorten-input-field-type';

type CategoryDropdownItemProps = {
  category: Category;
  onSelect: (option: ShortenInputFieldType) => void;
  isValue?: boolean;
};

export function CategoryDropdownItem(props: CategoryDropdownItemProps) {
  const { category, isValue, onSelect } = props;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(category);
      }}
      tabIndex={1}
      className='flex h-[40px] cursor-pointer items-center px-[16px] transition-all hover:bg-royal-300/[.1]'
    >
      {isValue && (
        <div className='me-[12px]'>
          <Image
            src='/icons/shorten/tick_royal.svg'
            alt='tick'
            width={0}
            height={0}
            className='h-[100%] w-auto'
          />
        </div>
      )}
      <div
        style={{ backgroundColor: category.color }}
        className='me-[8px] aspect-square w-[12px] rounded-full'
      ></div>
      <p className='truncate'>{category.name}</p>
    </div>
  );
}

type CategoryDropdownItemsProps = {
  options: Category[];
  values: Category[];
  onSelect: (option: ShortenInputFieldType) => void;
  creatingValue?: string;
  onCreate?: () => void;
};

export default function CategoryDropdownItems(
  props: CategoryDropdownItemsProps,
) {
  const { options, values, onSelect, creatingValue, onCreate } = props;

  return (
    <div>
      {creatingValue && onCreate && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onCreate();
          }}
          tabIndex={1}
          className='flex h-[40px] cursor-pointer items-center px-[16px] transition-all hover:bg-royal-300/[.1]'
        >
          <p className='me-[8px] truncate'>Create</p>
          <div className='rounded-[8px] border-[1px] border-primary px-[12px] py-[4px]'>
            {creatingValue}
          </div>
        </div>
      )}
      {values.concat(options).map((category) => (
        <CategoryDropdownItem
          isValue={!!values.find((value) => value._id === category._id)}
          key={category._id}
          onSelect={onSelect}
          category={category}
        />
      ))}
    </div>
  );
}
