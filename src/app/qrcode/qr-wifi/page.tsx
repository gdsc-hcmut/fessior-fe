/* eslint-disable */

'use client';

import Image from 'next/image';
import { useState, useEffect, useContext, useMemo } from 'react';

import Button from '@/components/button';
import CategoryDropdownItems from '@/components/category-dropdown-item';
import Input from '@/components/input';
import ShortenCategories from '@/components/shorten-categories';
import AuthContext from '@/contexts/authContext';
import { useAuthRouter, useScreenSize } from '@/hooks';
import { meService, categoryService, organizationService } from '@/services';
import { getIcon } from '@/utils/common';

import { CategoryColor, ShortenInputFieldEnum, ShortenInputFieldType, Organization, Category, Icon } from '@/types';
import ScreenSize from '@/types/screen-size-enum';
import Url from '@/types/url-type';

enum EncryptionType {
  WPA_WPA2 = 'WPA/WPA2',
  WEP = 'WEP',
  NONE = 'NONE',
  RAW = 'RAW',
}

export default function CreateQRWifiScreen() {
  const [inputQRName, setInputQRName] = useState<null | string>(null);
  const [inputSSID, setInputSSID] = useState<null | string>(null);
  const [inputPassword, setInputPassword] = useState<null | string>(null);
  const [inputEncryption, setInputEncryption] = useState<EncryptionType[]>([EncryptionType.WPA_WPA2]);
  const [organizationOptions, setOrganizationOptions] = useState<null | Organization[]>(null);
  const [organization, setOrganization] = useState<null | Organization>(null);
  const [domain, setDomain] = useState('');
  const [domainOptions, setDomainOptions] = useState<null | string[]>(null);
  const { isLoggedIn, isAuthStatusReady } = useContext(AuthContext);
  useState<null | Organization>(null);
  const [categoryOptions, setCategoryOptions] = useState<null | Category[]>(null);
  const [categoryValues, setCategoryValues] = useState<Category[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { screenSize, loaded } = useScreenSize();
  const authRouter = useAuthRouter();

  const passwordVisileImage = useMemo(() => {
    return getIcon('/icons/qrcode', 'password_visible.svg', passwordVisible ? Icon.ACTIVE : Icon.INACTIVE);
  }, [passwordVisible]);
  const logWifiInfo = async () => {
    const wifiInfo = {
      inputQRName,
      inputSSID,
      inputPassword,
      inputEncryption,
      organization,
      categoryValues,
    };
    console.log(wifiInfo);
  };
  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        const organizationOptionsInitial = await meService.getOrganization();
        setOrganizationOptions(organizationOptionsInitial);
        setDomainOptions(organizationOptionsInitial[0].domains);
        setOrganization(organizationOptionsInitial[0]);
        setDomain(organizationOptionsInitial[0].domains[0]);
        const categoryOptionsInitial = (
          await organizationService.searchCategoryByOrganizationId(organizationOptionsInitial[0]._id)
        ).categories; // pagination is for another day
        setCategoryOptions(categoryOptionsInitial);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    (async () => {
      if (!organization) return;

      setDomainOptions(organization.domains);
      setDomain(organization.domains[1]);
      const categoryOptionsInitial = (await organizationService.getCategoryByOrganizationId(organization._id))
        .categories as Category[]; // pagination is for another day
      setCategoryOptions(categoryOptionsInitial);
      setCategoryValues([]);
    })();
  }, [organization]);

  useEffect(() => {
    (async () => {
      if (!organization) return;

      setCategoryOptions(
        (await organizationService.searchCategoryByOrganizationId(organization._id, categorySearch)).categories.filter(
          (category: Category) => !categoryValues.find((value) => value._id === category._id),
        ),
      );
    })();
  }, [categorySearch, categoryValues, organization]); // TODO: Use Reducer???

  const handleChange = (shortenField: ShortenInputFieldEnum) => {
    switch (shortenField) {
      case ShortenInputFieldEnum.ORGANIZATION:
        return (value: Organization) => {
          setOrganization(value);
        };
      case ShortenInputFieldEnum.DOMAIN:
        return (value: string) => {
          setDomain(value);
        };
      case ShortenInputFieldEnum.CATEGORY:
        return (category: Category) => {
          if (categoryValues.find((categoryValue) => categoryValue._id === category._id)) {
            setCategoryValues(categoryValues!.filter((categoryValue) => categoryValue._id !== category._id));
            setCategoryOptions(categoryOptions!.concat(category));
          } else {
            setCategoryValues(categoryValues.concat(category));
            setCategoryOptions(categoryOptions!.filter((option) => option._id !== category._id));
          }
        };
      default:
        return () => {};
    }
  };

  const handleCategoryCreate = async (categoryName: string) => {
    if (!organization) return;

    try {
      const response = await categoryService.createCategory({
        name: categoryName,
        color: CategoryColor.BLUE,
        organization: organization?._id,
        urls: [] as Url['_id'][],
      });

      setCategoryValues(categoryValues.concat(response));
    } catch (e: any) {
      const message = e.response.data.message;
      setErrorMessage(Array.isArray(message) ? message[0] : message);
    }
  };
  const inputFontSize = useMemo(() => {
    return screenSize === ScreenSize.LG ? undefined : 12;
  }, [screenSize]);
  const inputHeight = useMemo(() => {
    return screenSize === ScreenSize.LG ? 48 : undefined;
  }, [screenSize]);
  const encryptionOptions = [EncryptionType.WPA_WPA2, EncryptionType.WEP, EncryptionType.NONE, EncryptionType.RAW];
  const isLoaded =
    (isAuthStatusReady &&
      isLoggedIn &&
      organization &&
      organizationOptions &&
      categoryOptions &&
      domainOptions &&
      domain &&
      loaded) ||
    (isAuthStatusReady && !isLoggedIn);

  return (
    <>
      <div className='relative mx-auto mb-[172px] w-[90%] rounded-[8px] border-[0.5px] border-[#7e7e7e4d] bg-white p-[24px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] lg:w-[100%] lg:max-w-[856px]'>
        <div className='container md:inline-flex'>
          <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
            QR Name
          </h6>
          <div className='mb-[16px] md:ml-6 md:w-[90%]'>
            <Input
              fontSize={inputFontSize}
              iconSrc='/icons/qrcode/label_outline.svg'
              iconAlt='label-outline-icon'
              placeholder='Enter your QR name'
              textValue={inputQRName as string}
              divider={true}
              iconPosition='left'
              onInput={setInputQRName}
              onEnter={() => {
                logWifiInfo();
              }}
              height={inputHeight}
            />
          </div>
        </div>
        <div className='container md:inline-flex'>
          <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
            WiFi SSID
          </h6>
          <div className='mb-[16px] md:ml-[24px] md:w-[90%]'>
            <Input
              fontSize={inputFontSize}
              iconSrc='/icons/qrcode/label_outline.svg'
              iconAlt='label-outline-icon'
              placeholder='Wifi SSID (Name)'
              textValue={inputSSID as string}
              divider={true}
              iconPosition='left'
              onInput={setInputSSID}
              onEnter={() => {
                logWifiInfo();
              }}
              height={inputHeight}
            />
          </div>
        </div>
        <div>
          <div className='inline-block md:mb-[8px] md:flex md:flex-grow'>
            <div className='mb-4 flex items-center justify-between md:mb-[8px] md:me-[20px] md:inline-flex'>
              <p className='inline text-[16px] font-[500] md:text-[20px]'>Encryption</p>
              <Input
                fontSize={inputFontSize}
                textValue={inputEncryption.toString()}
                dropdownOptions={encryptionOptions}
                onDropdownSelect={(selectedOption: any) => {
                  setInputEncryption(selectedOption);
                }}
                collapseIcon={true}
                className='ms-[24px]  w-[156px] md:ms-2 lg:w-[200px]'
                height={inputHeight}
              />
            </div>
            {isLoaded && isLoggedIn && (
              <div className='mb-4 flex items-center justify-between md:mb-[8px] md:me-[20px] md:ml-8 md:inline-flex'>
                <p className='inline text-[16px] font-[500] text-black md:text-[20px]'>Organization</p>
                <Input
                  collapseIcon
                  height={inputHeight}
                  className='ms-[4px] w-[156px] md:ms-[8px] lg:w-[200px]'
                  fontSize={inputFontSize}
                  textValue={organization!.shortName}
                  dropdownOptions={organizationOptions!}
                  onDropdownSelect={
                    handleChange(ShortenInputFieldEnum.ORGANIZATION) as (value: ShortenInputFieldType) => void
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className='mb-[16px] md:flex md:items-center md:justify-between'>
          <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>Password</h6>
          <div className='relative flex items-center md:ml-[20px] md:flex-grow'>
            <Input
              fontSize={inputFontSize}
              type={passwordVisible ? 'text' : 'password'}
              iconSrc='/icons/qrcode/password.svg'
              iconAlt='password-icon'
              placeholder='Enter your password'
              textValue={inputPassword as string}
              divider={true}
              onInput={setInputPassword}
              height={inputHeight}
              onEnter={() => {
                logWifiInfo();
              }}
              className='pr-8'
            />
            <button
              className='absolute right-3 inline-flex h-[32px] w-[32px] items-center justify-center rounded-full hover:bg-gray-300'
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <Image src={passwordVisileImage} alt='password-visible-icon' width={24} height={24} />
            </button>
          </div>
        </div>
        {isLoggedIn && isLoaded && (
          <div className='mb-[16px] md:flex md:items-center md:justify-between'>
            <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>Category</h6>
            <div className='md:ml-[25px] md:inline-block md:flex-grow'>
              <Input
                dropdownOptions={categoryOptions!}
                dropdownValues={categoryValues}
                onDropdownSelect={
                  handleChange(ShortenInputFieldEnum.CATEGORY) as (value: ShortenInputFieldType) => void
                }
                fontSize={inputFontSize}
                height={inputHeight}
                iconSrc='/icons/qrcode/search.svg'
                iconAlt='search-icon'
                placeholder='Add or create categories'
                textValue={categorySearch}
                onInput={setCategorySearch}
                divider
                renderCustomDropdownItems={(options, onSelect, values, creatingValue) => (
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
              handleChange={handleChange(ShortenInputFieldEnum.CATEGORY) as (category: Category) => void}
              categories={categoryValues}
            />
          </div>
        )}
        <div className='mx-auto mt-2 flex max-w-[288px] items-center justify-between space-x-4 text-[12px] md:max-w-[352px] md:text-[100%]'>
          <Button
            type='positive'
            className='h-[40px] w-[136px] md:w-[160px]'
            onClick={() => {
              logWifiInfo();
            }}
          >
            Create Now
          </Button>
          <Button
            type='neutral'
            className='h-[40px] w-[136px] md:w-[160px]'
            onClick={() => {
              logWifiInfo();
            }}
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
