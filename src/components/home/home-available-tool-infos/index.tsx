import Image from 'next/image';

import ToolInfoTemplate from '../tool-info-template';

export function ShortenerInfo() {
  return (
    <ToolInfoTemplate
      name='URL Shortener'
      active
      decorImgSrc='/images/home/side_shortener.svg'
      description={
        <div>
          <p className='mb-[8px] leading-[28px]'>
            <b>URL Shortener</b> is one of the first community projects
            developed by <b>Fessior Community</b> that serves the purpose of
            simplifying complex URLs (links to web pages) into short or branded
            links to enhance the brand identity of GDSC or partner
            organizations.
          </p>
          <p className='leading-[28px]'>
            In addition to the basic feature of URL shortening, users only need
            to log in with their Google accounts to access{' '}
            <b>advanced management features</b> completely free of charge. These
            features include:
          </p>
          <ul className='list-inside list-disc'>
            <li>
              Shorten URLs with a <b>custom slug</b>.
            </li>
            <li>
              <b>Branded links</b> for partner organizations.
            </li>
            <li>
              Shorten links’ <b>statistics</b>: total clicks, clicks per day,
              time of creation...
            </li>
            <li>
              <b>Manage</b> your list of shortened URLs; filter, edit, delete,
              and tag.
            </li>
          </ul>
        </div>
      }
      statistics={[
        <>
          More than <b>700</b> users
        </>,
        <>
          <b>160.000</b> clicks
        </>,
        <>
          <b>3500</b> URLs generated
        </>,
      ]}
      url='/shorten'
    />
  );
}

export function QRGeneratorInfo() {
  return (
    <ToolInfoTemplate
      name='QR Generator'
      decorImgSrc='/images/home/side_shortener.svg'
      description={
        <div>
          <p className='mb-[8px] leading-[28px]'>
            Forget the struggles of typing complex web addresses on tiny
            screens. Our powerful <b>QR Generator</b> simplifies everything!
            Transform any website address, social media link, or URL into a
            scannable QR code in seconds. With a quick scan, users unlock
            instant access to your content, no more laborious typing or
            memorizing required.
          </p>
          <p className='font-[700] leading-[28px]'>How it works:</p>
          <ul className='list-inside list-disc'>
            <li>Simply input the address you want to share</li>
            <li>Pick from a variety of stylish and customizable options</li>
            <li>Get your high-resolution QR code ready to use</li>
            <li>
              Share it on flyers, posters, business cards, social media, or even
              product packaging
            </li>
            <li>
              Watch your website traffic soar as people conveniently access your
              content with a scan
            </li>
          </ul>
        </div>
      }
      url=''
    />
  );
}

export function CertificateInfo() {
  return null;
}

export function CalendarInfo() {
  return null;
}

export function CodeWithMeInfo() {
  return null;
}

export function QNAInfo() {
  return (
    <div className='mx-[20px] flex min-h-[100%] flex-grow flex-col overflow-hidden rounded-[8px] border-[0.5px] md:flex-row xl:mx-[40px]'>
      <div className='flex flex-grow items-center justify-center p-[40px] xl:min-h-[480px]'>
        <div className='flex flex-col items-center'>
          <Image
            src='/images/home/coming_soon.svg'
            alt='coming-soon'
            width={0}
            height={0}
            className='mb-[48px] h-auto w-[50%]'
          />
          <h4 className='text-[36px] font-[700] text-primary md:text-[40px] xl:text-[48px]'>
            Coming Soon!
          </h4>
          <p className='md:text-[24px] xl:text-[28px]'>
            The project is being developed
          </p>
        </div>
      </div>
      <div className="hidden aspect-square w-[30%] flex-col items-center justify-center bg-[url('/images/home/side_coming_soon.svg')] bg-cover md:flex md:justify-end md:pb-[36px] xl:aspect-auto xl:min-w-[400px]"></div>
    </div>
  );
}
