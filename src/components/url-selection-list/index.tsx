import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type UrlSelectionListProps = {
  isDomain: boolean;
  selectionList: string[];
};

export default function UrlSelectionList(props: UrlSelectionListProps) {
  const { isDomain, selectionList } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState<string[]>([]);
  const [hiddenSelection, setHiddenSelection] = useState<string[]>([]);
  const [isDivFull, setIsDivFull] = useState(false);
  const [width, setWidth] = useState<number | null>(400);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  const calculateBoxWidth = (text: string) => {
    const fontSize = 12;
    const padding = 8;
    const dummyDiv = document.createElement('div');
    dummyDiv.style.fontSize = `${fontSize}px`;
    dummyDiv.style.padding = `${padding}px`;
    dummyDiv.style.width = 'fit-content';
    dummyDiv.textContent = text;

    document.body.appendChild(dummyDiv);
    const elementWidth = dummyDiv.clientWidth + 1;
    document.body.removeChild(dummyDiv);

    return elementWidth;
  };

  useEffect(() => {
    const renderBoxes = () => {
      let currentWidth = 0;
      const newCategories = [];
      const newHiddenCategories = [];

      for (let i = 0; i < selectionList.length; i++) {
        const boxWidth = calculateBoxWidth(selectionList[i]);
        if (
          currentWidth + boxWidth <=
          (window ? window.innerWidth * 0.15 : 400)
        ) {
          newCategories.push(selectionList[i]);
          currentWidth += boxWidth;
        } else {
          if (!isDivFull) setIsDivFull(true);
          newHiddenCategories.push(selectionList[i]);
        }
      }

      setSelection(newCategories);
      setHiddenSelection(newHiddenCategories);
    };

    setIsDivFull(false);
    renderBoxes();
  }, [width, selectionList]);

  return (
    <div className='ml-3 flex max-w-[40vw] items-center rounded-lg border-[0.5px] border-primary px-3 py-2'>
      <p className='mr-2 text-xs font-semibold'>
        Chosen {isDomain ? 'domain' : 'category'}:
      </p>
      <div ref={ref} className='flex space-x-1'>
        {selection.map((item, index) => (
          <div
            key={index}
            className='flex items-center space-x-1 rounded-lg bg-primary px-2 py-1 text-xs text-white'
          >
            <p>{item}</p>
            <Image
              src='/icons/header/close_white.svg'
              alt='Close icon'
              width={0}
              height={0}
              className='h-auto w-2'
            />
          </div>
        ))}
        {isDivFull && (
          <div className='group relative overflow-visible'>
            <div className='flex h-6 w-6 items-center justify-center rounded-lg bg-primary'>
              <Image
                src='/icons/url/more_horiz.svg'
                alt='More icon'
                width={0}
                height={0}
                className='h-auto w-5'
              />
            </div>
            <span className='absolute left-[0px] top-7 z-[10] flex max-h-[50vh] max-w-[320px] scale-0 items-center justify-center rounded bg-white px-4 py-3 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] group-hover:scale-100'>
              <div className='flex flex-wrap gap-x-2 gap-y-2'>
                {hiddenSelection.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-1 rounded-lg bg-primary px-2 py-1 text-xs text-white'
                  >
                    <p>{item}</p>
                    <Image
                      src='/icons/header/close_white.svg'
                      alt='Close icon'
                      width={0}
                      height={0}
                      className='h-auto w-2'
                    />
                  </div>
                ))}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
