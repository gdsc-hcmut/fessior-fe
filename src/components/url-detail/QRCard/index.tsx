import clsx from 'clsx';
import Image from 'next/image';
import QRCode, { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
// import sampleQR from '../../../../public/images/url/sampleQR.png';

function QRCard() {
  const [isSVG, setIsSVG] = useState(false);
  const [currentSize, setCurrentSize] = useState(100);
  const [copied, setCopied] = useState(false);

  const sizeList = [200, 500, 1000];
  const ref = useRef<HTMLImageElement>(null);
  const qrref = useRef<HTMLDivElement>(null);

  const [qrSize, setQrSize] = useState(qrref.current?.offsetWidth || 0);

  const handleResize = () => {
    if (qrref.current) setQrSize(qrref.current.offsetWidth - 16);
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, [handleResize]);

  useLayoutEffect(() => {
    handleResize();
  }, []);

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
    if (isSVG) {
      const svgElement = document.getElementById('qrcodesvg');
      if (!svgElement) {
        toast.error('QR Code not found');
        return;
      }
      const svgContent = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const a = document.createElement('a');
      a.href = svgUrl;
      a.download = 'test.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(svgUrl);
    } else {
      const img = document.getElementById('qrcodepng') as HTMLImageElement;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = currentSize;
      canvas.height = currentSize;

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
    }
  };

  const onChangeSize = (size: number) => {
    setCurrentSize(size);
  };

  const onCopy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (!isSVG) {
      const img = document.getElementById('qrcodepng') as HTMLCanvasElement;
      const dataUrl = img.toDataURL('image/png');
      copyQR(dataUrl);
    } else {
      const svgElement = document.getElementById('qrcodesvg');
      if (!svgElement) return;
      const svgCode = new XMLSerializer().serializeToString(svgElement);
      navigator.clipboard.writeText(svgCode);
    }
    setCopied(true);
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1500);
  }, [copied]);

  return (
    <div className='flex w-full justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div
        id='qr-container'
        ref={qrref}
        className='h-[32vw] w-[32vw] rounded-lg bg-white p-2 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] xs:h-[40vw] xs:w-[40vw] tablet:h-[20vw] tablet:w-[20vw] lg:h-[15vw] lg:w-[15vw] xl:h-[12vw] xl:w-[12vw] 2xl:mr-4 2xl:h-[10vw] 2xl:w-[10vw] 3xl:mr-5'
      >
        {isSVG ? (
          <QRCodeSVG
            id='qrcodesvg'
            style={{
              width: '100%',
              height: 'auto',
            }}
            value='https://furl.one/example'
          />
        ) : (
          <QRCodeCanvas
            id='qrcodepng'
            size={qrSize}
            value='https://furl.one/example'
          />
        )}
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
          {!isSVG && (
            <div className='flex'>
              <p className='mr-2 font-medium text-primary'>Size</p>
              <div className='group relative mr-1'>
                <input
                  type='number'
                  value={currentSize}
                  min={0}
                  max={2000}
                  onChange={(e) => setCurrentSize(+e.target.value)}
                  className='number-input flex w-[60px] items-center justify-center space-x-2 rounded-lg border-[1px] border-[#252641] px-2'
                />
                <div className='absolute top-7 z-[5] flex w-[60px] scale-0 animate-fade flex-col space-y-1 rounded-lg border-[1px] border-[#252641] bg-white py-1 group-focus-within:scale-100'>
                  {sizeList.map((size, idx) => (
                    <button onClick={() => onChangeSize(size)} key={idx}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <p>px</p>
            </div>
          )}
        </div>
        <div className='mt-2 flex space-x-2 xs:mt-0'>
          <button
            onClick={downloadQR}
            className='flex space-x-1 rounded-lg border-[1px] border-primary bg-white px-2 py-1'
          >
            <Image
              src='/icons/url/download_primary.svg'
              alt='Download icon'
              width={0}
              height={0}
              className='h-5 w-auto 3xl:hidden'
            />
            <p className='text-primmary font-semibold 3xl:hidden'>Save</p>
            <p className='hidden whitespace-nowrap font-semibold text-primary 3xl:block'>
              Save QR Code
            </p>
          </button>
          <button
            onClick={onCopy}
            className='flex h-8 w-8 items-center justify-center rounded-lg border-[1px] border-primary bg-white'
          >
            <Image
              src={
                copied
                  ? '/icons/shorten/active/tick.svg'
                  : '/icons/shorten/active/content_copy.svg'
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
