import DropDown from '@/components/listbox-select';
import ToggleButton from '@/components/toggle-button';

export default function FramePart() {
  return (
    <div className=' flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[16px] pb-[16px] xl:pl-[34px] xl:pt-[28px]'>
      <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-6px] xl:mt-0 xl:h-[28px]'>
        <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
          Frame
        </p>
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='mt-[10px] md:ml-[4px] md:mt-[40px] xl:ml-[2px]'>
          <div className='flex h-[24px] flex-col justify-center md:h-[30px] md:justify-end xl:h-[20px]'>
            <p className='text-[16px] font-medium xl:text-[18px]'>
              Frame background
            </p>
          </div>
          <div className='mt-[4px] flex h-[40px] w-[112px] flex-row items-center rounded-[8px] border pl-[10px] pr-[6px] md:h-[60px] md:w-[200px] md:pl-[12px] xl:h-[60px] xl:w-[240px] xl:pl-[16px] xl:pr-[6px]'>
            <p className='text-[14px] font-medium text-primary md:text-[16px] xl:text-[20px]'>
              #FFFFFF
            </p>
            <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border md:h-[48px] md:w-[48px]'></div>
          </div>
        </div>
        <div className='mt-[8px] inline-flex flex-row items-center md:ml-[52px] md:self-end '>
          <div className='mr-[14px] hidden md:flex'>
            <ToggleButton type='tablet' />
          </div>
          <div className='mr-[27px] flex h-[16px] w-[129px] flex-row items-center md:w-[220px]'>
            <p className='text-[12px] font-normal md:text-[16px] xl:text-[20px] xl:font-medium'>
              Transparent background
            </p>
          </div>
          <div className='md:hidden'>
            <ToggleButton type='mobile' />
          </div>
        </div>
      </div>

      <div className='mt-[16px]'>
        <div className=''>
          <div className='flex h-[24px] flex-col justify-center md:ml-[4px] md:h-[20px]'>
            <p className='text-[16px]  font-medium xl:text-[18px] '>
              Additional text
            </p>
          </div>
          <div className='relative mt-[4px] h-[40px] w-auto rounded-[8px] border-[0.5px] border-gray-300 md:ml-[4px] md:h-[60px]'>
            <input
              type='text'
              className='h-full w-full rounded-[8px] pl-[12px] text-[12px] focus:outline-[1px] focus:outline-primary md:text-[16px] xl:pl-[16px] xl:text-[18px]'
              placeholder='Enter additional text'
            />
          </div>
          <div className='mt-[8px] flex flex-row gap-[18px] md:ml-[4px] md:mt-[16px] md:gap-[40px]'>
            <div className='w-[100px]  grow md:w-[202px] '>
              <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  Font
                </p>
              </div>
              <div className='mt-[4px] font-medium'>
                <DropDown
                  value='Roboto'
                  options={[
                    'Times New Roman',
                    'Baloo Chettan 2',
                    'Glory',
                    'Arial',
                    'ABeeZee',
                    'Aldrich',
                  ]}
                  heightOfDropDown='28'
                  textSize='12'
                  paddingLeft='8'
                  mediumHeight='60'
                  mediumPaddingLeft='16'
                  mediumTextSize='16'
                  paddingRight='4'
                  mediumPaddingRight='20'
                  mediumBorder='1'
                />
              </div>
            </div>
            <div className='w-[100px]  grow md:w-[202px] '>
              <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  {' '}
                  Text color
                </p>
              </div>
              <div className='mt-[4px] flex h-[28px] w-auto flex-row items-center rounded-[8px] border pl-[8px] pr-[4px] md:h-[60px] md:pl-[16px] md:pr-[6px]'>
                <p className='text-[12px] md:text-[16px] md:font-medium'>
                  #FFFFFF
                </p>
                <div className='ml-auto h-[20px] w-[20px] rounded-[8px] border md:h-[48px] md:w-[48px]'></div>
              </div>
            </div>
            <div className='w-[52px] grow md:w-[124px]'>
              <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  Text size
                </p>
              </div>
              <div className='mt-[4px] md:font-medium'>
                <DropDown
                  value='18px'
                  options={[
                    '16px',
                    '18px',
                    '20px',
                    '24px',
                    '28px',
                    '32px',
                    '36px',
                    '40px',
                  ]}
                  heightOfDropDown='28'
                  textSize='12'
                  paddingLeft='6'
                  mediumHeight='60'
                  mediumPaddingLeft='16'
                  mediumTextSize='20'
                  paddingRight='4'
                  mediumPaddingRight='20'
                  mediumBorder='1'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-[8px] flex flex-col gap-y-[8px] md:ml-[4px] md:mt-[16px] md:gap-y-[16px]'>
          <div className='flex flex-row gap-x-[16px] md:gap-x-[40px]'>
            <div className='grow md:flex md:w-[202px] md:flex-row md:items-center  '>
              <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  Border width
                </p>
              </div>
              <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px] xl:ml-[2px]'>
                <DropDown
                  value='18px'
                  options={[
                    '16px',
                    '18px',
                    '20px',
                    '24px',
                    '28px',
                    '32px',
                    '36px',
                    '40px',
                  ]}
                  heightOfDropDown='28'
                  textSize='12'
                  paddingLeft='6'
                  mediumHeight='36'
                  mediumPaddingLeft='8'
                  mediumTextSize='20'
                  paddingRight='4'
                  mediumPaddingRight='0'
                  mediumBorder='1'
                />
              </div>
            </div>
            <div className='grow md:flex md:w-[202px] md:flex-row md:items-center'>
              <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  {' '}
                  Border radius
                </p>
              </div>
              <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px] xl:ml-[2px]'>
                <DropDown
                  value='18px'
                  options={[
                    '16px',
                    '18px',
                    '20px',
                    '24px',
                    '28px',
                    '32px',
                    '36px',
                    '40px',
                  ]}
                  heightOfDropDown='28'
                  textSize='12'
                  paddingLeft='6'
                  mediumHeight='36'
                  mediumPaddingLeft='8'
                  mediumTextSize='20'
                  paddingRight='4'
                  mediumPaddingRight='0'
                  mediumBorder='1'
                />
              </div>
            </div>
            <div className='md:w-[124px] md:grow'></div>
          </div>
          <div className='flex flex-row gap-x-[16px] md:gap-x-[40px]'>
            <div className='grow md:flex md:w-[202px] md:flex-row md:items-center'>
              <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  {' '}
                  Padding
                </p>
              </div>
              <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px] xl:ml-[2px]'>
                <DropDown
                  value='18px'
                  options={[
                    '16px',
                    '18px',
                    '20px',
                    '24px',
                    '28px',
                    '32px',
                    '36px',
                    '40px',
                  ]}
                  heightOfDropDown='28'
                  textSize='12'
                  paddingLeft='6'
                  mediumHeight='36'
                  mediumPaddingLeft='8'
                  mediumTextSize='20'
                  paddingRight='4'
                  mediumPaddingRight='0'
                  mediumBorder='1'
                />
              </div>
            </div>
            <div className='grow md:flex md:w-[202px] md:flex-row md:items-center '>
              <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                  {' '}
                  Margin
                </p>
              </div>
              <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px] xl:ml-[2px]'>
                <DropDown
                  value='18px'
                  options={[
                    '16px',
                    '18px',
                    '20px',
                    '24px',
                    '28px',
                    '32px',
                    '36px',
                    '40px',
                  ]}
                  heightOfDropDown='28'
                  textSize='12'
                  paddingLeft='6'
                  mediumHeight='36'
                  mediumPaddingLeft='8'
                  mediumTextSize='20'
                  paddingRight='4'
                  mediumPaddingRight='0'
                  mediumBorder='1'
                />
              </div>
            </div>
            <div className='md:w-[124px] md:grow'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
