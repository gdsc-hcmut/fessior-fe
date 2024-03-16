import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
// import sampleQR from '../../../../public/images/url/sampleQR.png';

function QRCard() {
  const [isSVG, setIsSVG] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [currentSize, setCurrentSize] = useState(100);
  const [copied, setCopied] = useState(false);

  const sizeList = [100, 200, 500, 1000];
  const ref = useRef<HTMLImageElement>(null);

  const copyToClipboard = async (pngBlob: Blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [pngBlob.type]: pngBlob,
        }),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const copyQR = async (src: string) => {
    const img = await fetch(src);
    const imgBlob = await img.blob();
    copyToClipboard(imgBlob);
    return;
  };

  const downloadQR = () => {
    const img = document.getElementById('qrcode') as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'test.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const onChangeSize = (size: number) => {
    setCurrentSize(size);
    setIsCollapsed(true);
  };

  const onCopy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (ref.current) copyQR(ref.current?.src);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1500);
  }, [copied]);

  return (
    <div className='flex w-full justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='h-[32vw] w-[32vw] rounded-lg bg-white p-2 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] xs:h-[40vw] xs:w-[40vw] tablet:h-[20vw] tablet:w-[20vw] lg:h-[15vw] lg:w-[15vw] xl:h-[12vw] xl:w-[12vw] 2xl:mr-4 2xl:h-[10vw] 2xl:w-[10vw]'>
        <img
          src='/images/url/sampleQR.png'
          alt='qr'
          className='h-auto w-full'
          id='qrcode'
          ref={ref}
        />
      </div>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <p className='mb-3 font-semibold text-primary xs:text-xl md:text-xl'>
            QR Code
          </p>
          <div className='mb-2 flex space-x-3 md:space-x-2'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setIsSVG(true)}
                className={clsx(
                  'flex h-3 w-3 items-center justify-center rounded-full xs:h-4 xs:w-4',
                  isSVG ? 'bg-[#D9D9D9]' : 'border-[1px] border-primary',
                )}
                id='svg'
              >
                {isSVG && (
                  <div className='h-2 w-2 rounded-full bg-primary xs:h-3 xs:w-3' />
                )}
              </button>
              <label
                htmlFor='svg'
                className='text-xs font-semibold text-primary xs:text-base'
              >
                SVG
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setIsSVG(false)}
                className={clsx(
                  'flex h-3 w-3 items-center justify-center rounded-full xs:h-4 xs:w-4',
                  !isSVG ? 'bg-[#D9D9D9]' : 'border-[1px] border-primary',
                )}
                id='png'
              >
                {!isSVG && (
                  <div className='h-2 w-2 rounded-full bg-primary xs:h-3 xs:w-3' />
                )}
              </button>
              <label
                htmlFor='png'
                className='text-xs font-semibold text-primary xs:text-base'
              >
                PNG
              </label>
            </div>
          </div>
          <div className='flex space-x-1'>
            <p className='font-medium text-primary'>Size</p>
            <div className='relative'>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className='flex w-[88px] items-center justify-center space-x-2 rounded-lg border-[1px] border-[#252641] px-2'
              >
                <p>{currentSize}px</p>
                <Image
                  src='/icons/url/collapse_grey.svg'
                  alt='Collapse icon'
                  width={0}
                  height={0}
                  className={clsx(
                    'h-auto w-3',
                    !isCollapsed && 'rotate-180 transform',
                  )}
                />
              </button>
              <div
                className={clsx(
                  'absolute top-7 z-[5] flex w-[88px] flex-col space-y-1 rounded-lg border-[1px] border-[#252641] bg-white py-1 pl-2',
                  isCollapsed ? 'scale-0' : 'animate-fade',
                )}
              >
                {sizeList
                  .filter((size) => size != currentSize)
                  .map((size, idx) => (
                    <button onClick={() => onChangeSize(size)} key={idx}>
                      {size}px
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-2 flex space-x-2 xs:mt-0'>
          <button
            onClick={downloadQR}
            className='flex space-x-1 rounded-lg bg-primary px-2 py-1'
          >
            <Image
              src='/icons/shorten/download.svg'
              alt='Download icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
            <p className='font-semibold text-white'>Save</p>
          </button>
          <button
            onClick={onCopy}
            className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'
          >
            <Image
              src={
                copied
                  ? '/icons/shorten/inactive/tick.svg'
                  : '/icons/shorten/inactive/content_copy.svg'
              }
              alt='Copy icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default QRCard;
