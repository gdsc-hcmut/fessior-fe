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
      <div className='h-[40vw] w-[40vw] rounded-lg bg-white p-2 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
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
          <p className='mb-3 text-xl font-semibold text-primary'>QR Code</p>
          <div className='mb-2 flex space-x-3'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setIsSVG(true)}
                className={clsx(
                  'flex h-4 w-4 items-center justify-center rounded-full',
                  isSVG ? 'bg-[#D9D9D9]' : 'border-[1px] border-primary',
                )}
                id='svg'
              >
                {isSVG && <div className='h-3 w-3 rounded-full bg-primary' />}
              </button>
              <label htmlFor='svg' className='font-semibold text-primary'>
                SVG
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setIsSVG(false)}
                className={clsx(
                  'flex h-4 w-4 items-center justify-center rounded-full',
                  !isSVG ? 'bg-[#D9D9D9]' : 'border-[1px] border-primary',
                )}
                id='png'
              >
                {!isSVG && <div className='h-3 w-3 rounded-full bg-primary' />}
              </button>
              <label htmlFor='png' className='font-semibold text-primary'>
                PNG
              </label>
            </div>
          </div>
          <div className='flex space-x-3'>
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
        <div className='flex space-x-2'>
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
