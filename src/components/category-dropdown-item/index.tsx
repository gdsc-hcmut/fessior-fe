import Image from 'next/image';
import { useState } from 'react';

import Category from '@/types/category-type';
import ShortenInputFieldType from '@/types/shorten-input-field-type';

type CategoryDropdownItemProps = {
  category: Category;
  onSelect: (option: ShortenInputFieldType) => void;
  isValue?: boolean;
};

export function CategoryDropdownItem(props: CategoryDropdownItemProps) {
  const { category, isValue, onSelect } = props;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(category);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={1}
      className='flex h-[40px] cursor-pointer items-center px-[16px] transition-all hover:bg-primary hover:text-white'
    >
      {isValue && (
        <div className='me-[12px]'>
          <Image
            src={
              isHovering
                ? '/icons/shorten/tick_white.svg'
                : '/icons/shorten/tick_royal.svg'
            }
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
          className='group flex h-[40px] cursor-pointer items-center px-[16px] transition-all hover:bg-primary hover:text-white'
        >
          <p className='me-[8px] truncate'>Create</p>
          <div className='rounded-[8px] border-[1px] border-primary group-hover:border-white md:px-[12px] md:py-[4px]'>
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
