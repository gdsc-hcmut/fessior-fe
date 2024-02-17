import Image from 'next/image';

import { useFilterOptionStore } from '@/store/filter-option';

type UrlSelectionListProps = {
  isDomain: boolean;
};

export default function UrlSelectionList(props: UrlSelectionListProps) {
  const { isDomain } = props;

  const { setFilterDomain, setFilterCategory, filterDomain, filterCategory } =
    useFilterOptionStore();

  const selectionList = isDomain ? filterDomain : filterCategory;

  const removeOption = (option: string) => {
    const newSelectionList = selectionList.filter((item) => item !== option);
    if (isDomain) {
      setFilterDomain(newSelectionList);
    } else {
      setFilterCategory(newSelectionList);
    }
  };

  if (selectionList.length === 0) return;

  return (
    <div className='ml-3 flex max-w-[30vw] items-center rounded-lg border-[0.5px] border-primary px-3'>
      <p className='mr-2 whitespace-nowrap py-2 text-xs font-semibold'>
        Chosen {isDomain ? 'domain' : 'category'}:
      </p>
      <div className='show-scrollbar flex space-x-1 overflow-x-scroll py-2'>
        {selectionList.map((item, index) => (
          <div
            key={index}
            className='flex items-center space-x-1 rounded-lg bg-primary py-1 pl-2 pr-3 text-xs text-white'
          >
            <p className='whitespace-nowrap'>{item}</p>
            <button onClick={() => removeOption(item)}>
              <Image
                src='/icons/header/close_white.svg'
                alt='Close icon'
                width={0}
                height={0}
                className='h-auto w-2'
                style={{
                  minWidth: '8px',
                  minHeight: '8px',
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
