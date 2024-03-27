'use client';
import iconLink from '@/../public/icons/qr/iconLink.svg';
import iconSearch from '@/../public/icons/qr/iconSearch.svg';
import iconShield from '@/../public/icons/qr/iconShield.svg';
import iconTag from '@/../public/icons/qr/iconTag.svg';
import DropDown from '@/components/listbox-select';
import TextInputIcon from '@/components/text-input-icons';

type props = { typeOfQR: string };
export default function InformationPart(props: props) {
  const { typeOfQR } = props;
  return (
    <div
      className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[16px] md:pr-[32px] xl:px-[36px] xl:pb-[20px]'
      id='informationPart'
    >
      <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-8px] xl:mt-[28px] xl:flex xl:h-[28px] xl:items-center'>
        <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
          Information
        </p>
      </div>
      <div
        className={`${
          typeOfQR === 'wifi' ? 'md:mt-[20px]' : 'mt-[40px]'
        } mt-[8px] hidden w-full flex-row items-center xl:mt-[40px] xl:flex `}
      >
        <div className='flex h-[24px] flex-col justify-center md:ml-[4px] xl:ml-0 xl:h-[20px]'>
          <p className='text-[16px] font-medium md:w-[104px] xl:w-[128px] xl:text-[20px]'>
            Categories
          </p>
        </div>

        <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:ml-[8px] xl:h-[60px]'>
          <TextInputIcon
            iconSrc={iconSearch}
            placeholder='Add or create new categories'
          />
        </div>
      </div>
      <div className='mt-[8px] flex w-full flex-col  md:mt-[15px] md:flex-row md:items-center xl:mt-[20px]'>
        <div className='flex h-[24px] flex-col justify-center md:ml-[4px] xl:ml-0 xl:h-[20px]'>
          <p className='text-[16px] font-medium md:w-[104px] xl:w-[128px] xl:text-[20px]'>
            QR name
          </p>
        </div>

        <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:ml-[8px] xl:h-[60px]'>
          <TextInputIcon iconSrc={iconTag} placeholder='Enter your QR name' />
        </div>
      </div>
      <div className={`${typeOfQR === 'url' ? '' : 'hidden'}`}>
        <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center xl:mt-[20px]'>
          <div className='flex h-[24px] flex-col justify-center md:ml-[4px] xl:ml-0 xl:h-[20px]'>
            <p className='text-[16px] font-medium md:w-[104px] xl:w-[128px] xl:text-[20px]'>
              Your URL
            </p>
          </div>

          <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:ml-[8px] xl:h-[60px]'>
            <TextInputIcon iconSrc={iconLink} placeholder='Enter your URL' />
          </div>
        </div>
        <div className='mr-[52px] mt-[10px] flex w-auto flex-col md:ml-[4px] md:mr-[0px] md:mt-[20px] md:flex-row md:items-center xl:mb-[28px] xl:ml-[0px] xl:mt-[20px] xl:w-full'>
          {/* Organization and Domain*/}
          <div className='flex flex-row items-center md:w-[277px] md:grow xl:w-[272px] xl:grow-0'>
            <div className='flex h-[18px] w-[68px] flex-col justify-center md:w-[104px] xl:h-[28px] xl:w-[128px]'>
              <p className='text-[12px] md:text-[16px] md:font-medium xl:text-[20px]'>
                Organization
              </p>
            </div>

            <div className='relative ml-[8px] grow md:ml-[33px] xl:ml-[8px] xl:block xl:w-[136px] xl:grow-0 xl:rounded-[8px]'>
              <DropDown
                value='GDSC'
                options={['GDSC', 'CTCT', 'OISP']}
                heightOfDropDown='28'
                textSize='12'
                mediumPaddingLeft='8'
                paddingLeft='8'
                mediumHeight='32'
                mediumTextSize='16'
                paddingRight='4'
                mediumPaddingRight='6'
                largeFont='regular'
                largeHeight='32'
                largePaddingLeft='8'
                largePaddingRight='4'
                largeTextSize='16'
                mediumBorder='1'
              />
            </div>
          </div>
          <div className='mt-[10px] flex flex-row items-center md:ml-[85px] md:mt-0 md:w-[240px] md:grow xl:ml-[62px]'>
            <div className='flex h-[18px] w-[68px] flex-col justify-center md:w-[54px] xl:h-[32px] xl:w-[80px]'>
              <p className='text-[12px] md:text-[16px] md:font-medium xl:text-[20px]'>
                Domain
              </p>
            </div>
            <div className='relative ml-[8px] grow md:ml-[46px]  xl:ml-[8px] xl:block xl:w-[136px] xl:grow-0 xl:rounded-[8px]'>
              <DropDown
                value='furl.one'
                options={['furl.one', 'bkoisp.info', 'gic.gdsc.app']}
                heightOfDropDown='28'
                textSize='12'
                mediumPaddingLeft='8'
                paddingLeft='8'
                mediumHeight='32'
                mediumTextSize='16'
                paddingRight='4'
                mediumPaddingRight='6'
                largeFont='regular'
                largeHeight='32'
                largePaddingLeft='8'
                largePaddingRight='4'
                largeTextSize='16'
                mediumBorder='1'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${typeOfQR === 'wifi' ? '' : 'hidden'}`}>
        <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
          <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
            <p className='text-[16px] font-medium md:w-[104px] xl:text-[20px]'>
              Wifi SSID
            </p>
          </div>

          <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:h-[60px]'>
            <TextInputIcon
              iconSrc={iconTag}
              placeholder='Enter your wifi SSID (name)'
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <div className='mt-[16px] flex flex-row items-center'>
            <div className='flex h-[24px] w-[100px] flex-col justify-center md:ml-[4px] md:w-[104px]'>
              <p className='text-[16px]  font-medium xl:text-[20px]'>
                Encryption
              </p>
            </div>
            <div className='w-[136px] md:ml-[33px] md:w-[160px]'>
              <DropDown
                value='WPA/WPA2'
                options={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                heightOfDropDown='40'
                textSize='16'
                paddingLeft='16'
                mediumHeight='48'
                mediumTextSize='20'
                paddingRight='4'
                mediumPaddingRight='12'
                mediumPaddingLeft='16'
                mediumBorder='1'
              />
            </div>
          </div>
          <div className='hidden max-w-[80px] grow md:block xl:hidden'></div>
          <div className=' mt-[16px] flex flex-row items-center xl:ml-[40px]'>
            <div className='flex h-[24px] w-[100px] flex-col justify-center md:ml-[4px] md:w-[80px] xl:w-[120px]'>
              <p className='text-[16px]  font-medium xl:text-[20px]'>
                Organization
              </p>
            </div>
            <div className='w-[136px] md:ml-[33px] md:w-[160px]'>
              <DropDown
                value='GDSC'
                options={['GDSC', 'CTCT', 'OISP']}
                heightOfDropDown='40'
                textSize='16'
                paddingLeft='16'
                mediumHeight='48'
                mediumTextSize='20'
                paddingRight='4'
                mediumPaddingRight='12'
                mediumPaddingLeft='16'
                mediumBorder='1'
              />
            </div>
          </div>
        </div>

        <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
          <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
            <p className='text-[16px] font-medium md:w-[104px] xl:text-[20px]'>
              Password
            </p>
          </div>

          <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:h-[60px] '>
            <TextInputIcon
              iconSrc={iconShield}
              placeholder='Enter your password'
            />
          </div>
        </div>
      </div>
      <div
        className={
          'mt-[8px] flex w-full flex-col md:mt-[20px] md:flex-row md:items-center xl:hidden'
        }
      >
        <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
          <p className='text-[16px] font-medium md:w-[104px]'>Category</p>
        </div>

        <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px]'>
          <TextInputIcon
            iconSrc={iconSearch}
            placeholder='Add or create categories'
          />
        </div>
      </div>
      <div className='mb-[16px] mt-[12px] flex flex-row items-center xl:hidden'>
        <div className='flex h-[15px] flex-col justify-center'>
          <p className='text-[12px] font-medium  text-black md:text-[16px]'>
            Chosen categories
          </p>
        </div>
        <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
          Event
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='ml-[4px] h-[12px] w-[12px]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </div>
        <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
          Favorite
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='ml-[4px] h-[12px] w-[12px]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
