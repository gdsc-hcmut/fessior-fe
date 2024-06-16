/* eslint-disable */

'use client';

import { useState, useEffect, useContext, useMemo } from 'react';

import Button from '@/components/button';
import CategoryDropdownItems from '@/components/category-dropdown-item';
import Input from '@/components/input';
import ShortenCategories from '@/components/shorten-categories';
import AuthContext from '@/contexts/authContext';
import { useAuthRouter, useScreenSize } from '@/hooks';
import { meService, categoryService, organizationService } from '@/services';

import { CategoryColor, Category, Organization } from '@/types';
import ScreenSize from '@/types/screen-size-enum';
import ShortenInputFieldEnum from '@/types/shorten-input-field-enum';
import ShortenInputFieldType from '@/types/shorten-input-field-type';
import Url from '@/types/url-type';

export default function QRURLScreen() {
  const [inputQRName, setInputQRName] = useState<null | string>(null);
  const [inputURL, setInputURL] = useState<null | string>(null);
  const [organizationOptions, setOrganizationOptions] = useState<null | Organization[]>(null);
  const [organization, setOrganization] = useState<null | Organization>(null);
  const [domain, setDomain] = useState('');
  const [domainOptions, setDomainOptions] = useState<null | string[]>(null);
  useState<null | Organization>(null);
  const [categoryOptions, setCategoryOptions] = useState<null | Category[]>(null);
  const [categoryValues, setCategoryValues] = useState<Category[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { screenSize, loaded } = useScreenSize();
  const { isLoggedIn, isAuthStatusReady } = useContext(AuthContext);

  const authRouter = useAuthRouter();

  const logUrlInfo = async () => {
    const urlInfo = {
      inputQRName,
      inputURL,
      organization,
      domain,
      categoryValues,
    };
    console.log(urlInfo);
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
                logUrlInfo();
              }}
              height={inputHeight}
            />
          </div>
        </div>
        <div className='container md:inline-flex'>
          <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
            Your URL
          </h6>
          <div className='mb-[12px] md:mb-[20px] md:ml-6 md:w-[90%]'>
            <Input
              fontSize={inputFontSize}
              iconSrc='/icons/qrcode/inactive/link_qr.svg'
              iconAlt='link-icon'
              placeholder='Enter your URL'
              textValue={inputURL as string}
              iconPosition='left'
              divider={true}
              onInput={setInputURL}
              onEnter={() => {
                logUrlInfo();
              }}
              height={inputHeight}
            />
          </div>
        </div>
        {isLoaded && isLoggedIn && (
          <div className='inline-block md:mb-[8px] md:flex md:flex-grow lg:mb-0'>
            <div className='mb-[8px] flex items-center justify-between md:me-[20px] md:inline-flex lg:mb-5'>
              <p className='inline  pr-[6px] text-[16px] font-[500] text-black md:text-[20px]'>Organization</p>
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
            <div className='flex items-center justify-between md:mb-2 md:inline-flex lg:mb-5'>
              <p className='inline text-[16px] font-[500] text-black md:text-[20px]'>Domain</p>
              <Input
                collapseIcon
                height={inputHeight}
                className='ms-[4px] w-[156px] md:ms-[8px] lg:w-[200px]'
                fontSize={inputFontSize}
                textValue={domain!}
                dropdownOptions={domainOptions!}
                onDropdownSelect={handleChange(ShortenInputFieldEnum.DOMAIN) as (value: ShortenInputFieldType) => void}
              />
            </div>
          </div>
        )}
        {isLoggedIn && isLoaded && (
          <div className='mb-[16px] mt-4 md:mt-0 md:flex md:items-center md:justify-between'>
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
        <div className='mx-auto mt-2 flex max-w-[288px] items-center justify-between space-x-4 text-[12px] md:max-w-[352px] md:space-x-8 md:text-[100%]'>
          <Button
            type='positive'
            className='h-[40px] w-[136px] md:w-[160px]'
            onClick={() => {
              logUrlInfo();
            }}
          >
            Create Now
          </Button>
          <Button
            type='neutral'
            className='h-[40px] w-[136px] md:w-[160px]'
            onClick={() => {
              logUrlInfo();
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
