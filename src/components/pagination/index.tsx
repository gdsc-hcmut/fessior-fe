import Image from 'next/image';
import { useState } from 'react';

type Props = {
  totalCount: number;
  pageSize?: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

const Pagination = ({
  totalCount,
  pageSize = 10,
  currentPage,
  onPageChange,
}: Props) => {
  const [inputPage, setInputPage] = useState<number>(currentPage);
  const totalPages = Math.ceil(totalCount / pageSize);

  const generateDisplayPageRange = (
    totalCount: number,
    pageSize: number,
    currentPage: number,
  ) => {
    const pageRange = [];
    if (currentPage == 1) {
      for (let i = currentPage; i <= totalPages && i <= currentPage + 5; i++) {
        pageRange.push(i);
      }
    } else if (currentPage == totalPages) {
      let startValue = currentPage - 5 > 0 ? currentPage - 5 : 1;
      for (let i = startValue; i <= totalPages; i++) {
        pageRange.push(i);
      }
    } else {
      for (
        let i = currentPage - 2 > 0 ? currentPage - 2 : 1;
        i <= currentPage + 2 && i <= totalPages;
        i++
      ) {
        pageRange.push(i);
      }
    }
    return pageRange;
  };

  const pageRange: number[] = generateDisplayPageRange(
    totalCount,
    pageSize,
    currentPage,
  );

  const submitPageChanage = (pageNumber: number) => {
    setInputPage(pageNumber);
    onPageChange(pageNumber);
  };

  if ((pageRange?.length || 0) <= 1) return null;

  return (
    <ul className='mt-10 flex items-center space-x-1 pb-[80px] md:pb-[54px]'>
      <li className='flex h-fit w-fit items-center justify-center'>
        <button
          className={`rounded-full ${
            currentPage === 1 ? '' : 'hover:bg-black/20'
          }`}
          disabled={currentPage === 1}
          onClick={() => submitPageChanage(1)}
        >
          <Image
            src='/icons/url/chevron_double.svg'
            alt='Chevron double left'
            width={0}
            height={0}
            className='h-5 w-auto 3xl:h-6'
          />
        </button>
      </li>

      <li className='flex h-fit w-fit items-center justify-center'>
        <button
          className={`rounded-full ${
            currentPage === 1 ? '' : 'hover:bg-primary'
          }`}
          disabled={currentPage === 1}
          onClick={() => submitPageChanage(currentPage - 1)}
        >
          <Image
            src='/icons/url/chevron.svg'
            alt='Chevron left'
            width={0}
            height={0}
            className='h-5 w-auto 3xl:h-6'
          />
        </button>
      </li>

      {pageRange?.map((pageNumber, index) => {
        return (
          <li
            key={`pagination-${pageNumber}`}
            className='flex h-fit w-fit items-center'
          >
            <button
              className={`aspect-square h-6 w-6 rounded-full 2xl:h-8 2xl:w-8  ${
                pageNumber === currentPage
                  ? 'bg-primary'
                  : 'ml-[-4px] mr-[-4px] hover:bg-primary'
              }`}
              onClick={() => submitPageChanage(pageNumber as number)}
            >
              <p
                className={`font-semibold 3xl:text-xl ${
                  pageNumber === currentPage ? 'text-white' : 'hover:text-white'
                }`}
              >
                {pageNumber}
              </p>
            </button>
          </li>
        );
      })}

      <li className='flex h-fit w-fit items-center justify-center'>
        <button
          className={`rounded-full ${
            currentPage === totalPages ? '' : 'hover:bg-black/20'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => submitPageChanage(currentPage + 1)}
        >
          <Image
            src='/icons/url/chevron.svg'
            alt='Chevron right'
            width={0}
            height={0}
            className='h-5 w-auto rotate-180 3xl:h-6'
          />
        </button>
      </li>
      <li className='flex h-fit w-fit items-center justify-center'>
        <button
          className={`rounded-full ${
            currentPage === totalPages ? '' : 'hover:bg-black/20'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => submitPageChanage(totalPages)}
        >
          <Image
            src='/icons/url/chevron_double.svg'
            alt='Chevron double right'
            width={0}
            height={0}
            className='h-5 w-auto rotate-180 3xl:h-6'
          />
        </button>
      </li>
      <li className='relative z-[5] pl-2 max-[419px]:hidden min-[420px]:block'>
        <form
          className='flex items-center space-x-2'
          onSubmit={(e) => {
            e.preventDefault();
            onPageChange(inputPage);
          }}
        >
          <p className='text-[12px] font-semibold md:text-base'>Go to page</p>
          <input
            type='number'
            className='h-7 w-8 rounded-lg border-[1px] border-primary px-2 py-1 font-semibold 2xl:h-8 2xl:w-10'
            value={inputPage}
            max={totalPages}
            min={1}
            onChange={(e) => setInputPage(Number(e.target.value))}
          />
          <p className='text-[12px] font-semibold min-[500px]:text-inherit md:text-base'>
            of {totalPages}
          </p>
        </form>
      </li>
    </ul>
  );
};

export default Pagination;
