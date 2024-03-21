'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';

import Button from '@/components/button';
import CategoryDropdownItems from '@/components/category-dropdown-item';
import Input from '@/components/input';
import ShortenCategories from '@/components/shorten-categories';
import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useScreenSize from '@/hooks/useScreenSize';
import meService from '@/libs/api/me';
import categoryService from '@/services/category.service';
import organizationService from '@/services/organization.service';
import CategoryColor from '@/types/category-color-enum';
import Category from '@/types/category-type';
import Organization from '@/types/organization-type';
import ScreenSize from '@/types/screen-size-enum';
import ShortenInputFieldEnum from '@/types/shorten-input-field-enum';
import ShortenInputFieldType from '@/types/shorten-input-field-type';
import Url from '@/types/url-type';

export default function CreateQRWifiScreen() {
  const router = useRouter();
  const [inputQRName, setInputQRName] = useState('');
  const [inputSSID, setInputSSID] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputEncryption, setInputEncryption] = useState('WPA/WPA2');
  const [organizationOptions, setOrganizationOptions] = useState<
    null | Organization[]
  >(null);
  const [organizationValue, setOrganizationValue] =
    useState<null | Organization>(null);
  const [domainValue, setDomainValue] = useState('');
  const [domainOptions, setDomainOptions] = useState<null | string[]>(null);
  const { meProfile, isAuthStatusReady } = useContext(AuthContext);
  useState<null | Organization>(null);
  const [categoryOptions, setCategoryOptions] = useState<null | Category[]>(
    null,
  );
  const [categoryValues, setCategoryValues] = useState<Category[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { screenSize, loaded } = useScreenSize();
  const authRouter = useAuthRouter();
  useEffect(() => {
    if (!meProfile) return;

    (async () => {
      try {
        const organizationOptionsInitial = await meService.getOrganization();
        setOrganizationOptions(organizationOptionsInitial);
        setDomainOptions(organizationOptionsInitial[0].domains);
        setOrganizationValue(organizationOptionsInitial[0]);
        setDomainValue(organizationOptionsInitial[0].domains[0]);
        const categoryOptionsInitial = (
          await organizationService.searchCategoryByOrganizationId(
            organizationOptionsInitial[0]._id,
          )
        ).categories; // pagination is for another day
        setCategoryOptions(categoryOptionsInitial);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, [meProfile]);

  useEffect(() => {
    (async () => {
      if (!organizationValue) return;

      setDomainOptions(organizationValue.domains);
      setDomainValue(organizationValue.domains[1]);
      const categoryOptionsInitial = (
        await organizationService.getCategoryByOrganizationId(
          organizationValue._id,
        )
      ).categories as Category[]; // pagination is for another day
      setCategoryOptions(categoryOptionsInitial);
      setCategoryValues([]);
    })();
  }, [organizationValue]);

  useEffect(() => {
    (async () => {
      if (!organizationValue) return;

      setCategoryOptions(
        (
          await organizationService.searchCategoryByOrganizationId(
            organizationValue._id,
            categorySearch,
          )
        ).categories.filter(
          (category: Category) =>
            !categoryValues.find((value) => value._id === category._id),
        ),
      );
    })();
  }, [categorySearch, categoryValues, organizationValue]); // TODO: Use Reducer???

  const handleChange = (shortenField: ShortenInputFieldEnum) => {
    switch (shortenField) {
      case ShortenInputFieldEnum.ORGANIZATION:
        return (value: Organization) => {
          setOrganizationValue(value);
        };
      case ShortenInputFieldEnum.DOMAIN:
        return (value: string) => {
          setDomainValue(value);
        };
      case ShortenInputFieldEnum.CATEGORY:
        return (category: Category) => {
          if (
            categoryValues.find(
              (categoryValue) => categoryValue._id === category._id,
            )
          ) {
            setCategoryValues(
              categoryValues!.filter(
                (categoryValue) => categoryValue._id !== category._id,
              ),
            );
            setCategoryOptions(categoryOptions!.concat(category));
          } else {
            setCategoryValues(categoryValues.concat(category));
            setCategoryOptions(
              categoryOptions!.filter((option) => option._id !== category._id),
            );
          }
        };
      default:
        return () => {};
    }
  };

  const handleCategoryCreate = async (categoryName: string) => {
    if (!organizationValue) return;

    try {
      const response = await categoryService.createCategory({
        name: categoryName,
        color: CategoryColor.BLUE,
        organization: organizationValue?._id,
        urls: [] as Url['_id'][],
      });

      setCategoryValues(categoryValues.concat(response));
    } catch (e: any) {
      const message = e.response.data.message;
      setErrorMessage(Array.isArray(message) ? message[0] : message);
    }
  };
  const inputFontSize = screenSize === ScreenSize.LG ? undefined : 12;
  const inputHeight = screenSize === ScreenSize.LG ? 48 : undefined;

  const isLoaded =
    (isAuthStatusReady &&
      meProfile &&
      organizationValue &&
      organizationOptions &&
      categoryOptions &&
      domainOptions &&
      domainValue &&
      loaded) ||
    (isAuthStatusReady && !meProfile);

  return (
    <>
      <div className='mx-auto my-5 flex w-[100%] max-w-[360px] justify-between text-[16px] font-[500] md:my-6 md:max-w-[416px] md:text-[20px]'>
        <Button
          onClick={() => {
            router.push('/qrcode/qr-url');
          }}
          className='flex items-center justify-center'
          width='full'
          type='neutral'
        >
          <div className='transition-all'>
            <Image
              src={'/icons/qrcode/inactive/link-qr.svg'}
              alt='link icon'
              width={40}
              height={40}
              className='pr-2'
            />
          </div>
          Website URL
        </Button>
        <Button
          width='full'
          type='positive'
          className='ml-6 flex items-center justify-center'
          onClick={() => {
            router.push('/qrcode/qr-wifi');
          }}
        >
          <div className='transition-all'>
            <Image
              src={'/icons/qrcode/active/wifi-chosen.svg'}
              alt='wifi icon'
              width={40}
              height={40}
              className='pr-2'
            />
          </div>
          Wi-fi
        </Button>
      </div>

      <div className='relative mx-auto mb-[172px]  w-[90%] rounded-[8px] border-[3px] border-solid border-primary bg-white p-[16px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] sm:max-w-[480px] md:flex md:w-[85%] md:max-w-[760px] md:flex-grow md:flex-col md:border-[0.5px] md:border-[#7e7e7e4d] lg:w-[100%] lg:max-w-[856px] lg:p-[24px]'>
        <div className='container md:inline-flex'>
          <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
            QR Name
          </h6>
          <div className='mb-[16px] md:ml-6 md:w-[90%]'>
            <Input
              iconSrc='/icons/qrcode/label_outline.svg'
              iconAlt='icon'
              placeholder='Enter your QR name'
              textValue={inputQRName}
              divider={true}
              iconPosition='left'
              onInput={setInputQRName}
              onEnter={() => {}}
              height={48}
            />
          </div>
        </div>
        <div className='container md:inline-flex'>
          <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
            WiFi SSID
          </h6>
          <div className='mb-[16px] md:ml-[24px] md:w-[90%]'>
            <Input
              iconSrc='/icons/qrcode/label_outline.svg'
              iconAlt='icon'
              placeholder='Wifi SSID (Name)'
              textValue={inputSSID}
              divider={true}
              iconPosition='left'
              onInput={setInputSSID}
              onEnter={() => {}}
              height={48}
            />
          </div>
        </div>
        <div>
          <div className='inline-block md:mb-[8px] md:flex md:flex-grow'>
            <div className='mb-4 flex items-center justify-between md:mb-[8px] md:me-[20px] md:inline-flex'>
              <p className='inline text-[16px] font-[500] md:text-[20px]'>
                Encryption
              </p>
              <Input
                textValue={inputEncryption}
                dropdownOptions={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                onDropdownSelect={(selectedOption: any) => {
                  setInputEncryption(selectedOption);
                }}
                collapseIcon={true}
                className='ms-[24px] w-[132px] md:ms-2'
                height={48}
              />
            </div>
          </div>
        </div>
        <div className='mb-[16px] md:flex md:items-center md:justify-between'>
          <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>
            Password
          </h6>
          <div className='md:ml-[20px] md:inline-block md:flex-grow'>
            <Input
              iconSrc='/icons/qrcode/password.svg'
              iconAlt='password icon'
              placeholder='Enter your password'
              textValue={inputPassword}
              divider={true}
              onInput={setInputPassword}
              height={48}
            />
          </div>
        </div>
        {meProfile && isLoaded && (
          <div className='mb-[8px] md:mb-[16px] md:flex md:items-center md:justify-between'>
            <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>
              Category
            </h6>
            <div className='md:ml-[25px] md:inline-block md:flex-grow'>
              <Input
                dropdownOptions={categoryOptions!}
                dropdownValues={categoryValues}
                onDropdownSelect={
                  handleChange(ShortenInputFieldEnum.CATEGORY) as (
                    value: ShortenInputFieldType,
                  ) => void
                }
                fontSize={inputFontSize}
                height={inputHeight}
                iconSrc='/icons/qrcode/search.svg'
                iconAlt='search icon'
                placeholder='Add or create categories'
                textValue={categorySearch}
                onInput={setCategorySearch}
                divider
                renderCustomDropdownItems={(
                  options,
                  onSelect,
                  values,
                  creatingValue,
                ) => (
                  <CategoryDropdownItems
                    onSelect={onSelect}
                    options={options as Category[]}
                    values={values as Category[]}
                    creatingValue={creatingValue}
                    onCreate={() => {
                      if (!creatingValue) return;
                      return handleCategoryCreate(creatingValue);
                    }}
                  />
                )}
              />
            </div>
          </div>
        )}
        {categoryValues.length > 0 && (
          <div className='mb-[8px]'>
            <p className='me-[12px] inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
              Chosen categories
            </p>
            <ShortenCategories
              handleChange={
                handleChange(ShortenInputFieldEnum.CATEGORY) as (
                  category: Category,
                ) => void
              }
              categories={categoryValues}
            />
          </div>
        )}
        <div className='mx-auto mt-2 flex max-w-[288px] items-center justify-between space-x-4 md:max-w-[352px]'>
          <Button
            type='positive'
            className='h-[40px] w-[136px] md:w-[160px]'
            onClick={() => {}}
          >
            Create Now
          </Button>
          <Button
            type='neutral'
            className='h-[40px] w-[136px] md:w-[160px]'
            onClick={() => {}}
          >
            Customize QR
          </Button>
        </div>
        <div className='absolute left-[-15px] top-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
        <div className='absolute bottom-[-15px] right-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
      </div>
    </>
  );
}
