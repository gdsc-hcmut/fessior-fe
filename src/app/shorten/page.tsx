/* eslint-disable */

'use client';

import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/button';
import CategoryDropdownItems from '@/components/category-dropdown-item';
import CustomToastContainer from '@/components/custom-toast-container';
import Input from '@/components/input';
import ModalShorten from '@/components/modal-shorten';
import ShortenCategories from '@/components/shorten-categories';
import ShortenTools from '@/components/shorten-tools';
import AuthContext from '@/contexts/authContext';
import { useAuthRouter, useScreenSize } from '@/hooks';
import { meService, categoryService, organizationService, urlService } from '@/services';

import { CategoryColor, Category } from '@/types';
import AuthType from '@/types/auth-type-enum';
import Organization from '@/types/organization-type';
import ScreenSize from '@/types/screen-size-enum';
import ShortenInputFieldEnum from '@/types/shorten-input-field-enum';
import ShortenInputFieldType from '@/types/shorten-input-field-type';
import Url from '@/types/url-type';

export default function Shorten() {
  const [organizationOptions, setOrganizationOptions] = useState<null | Organization[]>(null);
  const [organizationValue, setOrganizationValue] = useState<null | Organization>(null);
  const [domainValue, setDomainValue] = useState<null | string>(null);
  const [domainOptions, setDomainOptions] = useState<null | string[]>(null);
  const [categoryOptions, setCategoryOptions] = useState<null | Category[]>(null);
  const [categoryValues, setCategoryValues] = useState<Category[]>([]);
  const [longUrl, setLongUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<null | Url>(null);
  const [allowSubmit, setAllowSubmit] = useState(false);

  const { screenSize, loaded } = useScreenSize();

  const { isLoggedIn, isAuthStatusReady } = useContext(AuthContext);

  const authRouter = useAuthRouter();

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        const organizationOptionsInitial = await meService.getOrganization();
        setOrganizationOptions(organizationOptionsInitial);
        setDomainOptions(organizationOptionsInitial[0].domains);
        setOrganizationValue(organizationOptionsInitial[0]);
        setDomainValue(organizationOptionsInitial[0].domains[0]);
        const categoryOptionsInitial = (
          await organizationService.searchCategoryByOrganizationId(organizationOptionsInitial[0]._id)
        ).categories; // pagination is for another day
        setCategoryOptions(categoryOptionsInitial);
      } catch (e: any) {
        console.log(e.response.data.message); // TODO: Change this to use ModalAlert
      }
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    (async () => {
      if (!organizationValue) return;

      setDomainOptions(organizationValue.domains);
      setDomainValue(organizationValue.domains[0]);
      const categoryOptionsInitial = (await organizationService.getCategoryByOrganizationId(organizationValue._id))
        .categories as Category[]; // pagination is for another day
      setCategoryOptions(categoryOptionsInitial);
      setCategoryValues([]);
    })();
  }, [organizationValue]);

  useEffect(() => {
    if (longUrl.length > 0) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [longUrl]);

  useEffect(() => {
    (async () => {
      if (!organizationValue) return;

      setCategoryOptions(
        (
          await organizationService.searchCategoryByOrganizationId(organizationValue._id, categorySearch)
        ).categories.filter((category: Category) => !categoryValues.find((value) => value._id === category._id)),
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

  const handleSubmit = async () => {
    if (!(allowSubmit && organizationValue)) return;
    try {
      const responseUrl = await urlService.shorten({
        originalUrl: longUrl,
        slug: slug.length ? slug : null,
        domain: domainValue,
        organizationId: organizationValue._id,
      } as Url);

      setShortenedUrl(responseUrl);

      await organizationService.addUrlToCategories(organizationValue._id, {
        url: responseUrl._id,
        categories: categoryValues.map((category) => category._id),
      });
    } catch (e: any) {
      const message = e.response.data.message;
      toast.error(Array.isArray(message) ? message[0] : message);
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
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  const clearForm = () => {
    setLongUrl('');
    setSlug('');
    if (categoryOptions) setCategoryOptions(categoryOptions.concat(categoryValues));
    setCategoryValues([]);
  };

  const inputFontSize = screenSize === ScreenSize.LG ? undefined : 12;
  const inputHeight = screenSize === ScreenSize.LG ? 48 : undefined;

  const isLoaded =
    (isAuthStatusReady &&
      isLoggedIn &&
      organizationValue &&
      organizationOptions &&
      categoryOptions &&
      domainOptions &&
      domainValue &&
      loaded) ||
    (isAuthStatusReady && !isLoggedIn);

  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden leading-[1.2] text-primary'>
        <div className='px-[20px] md:max-w-[1000px] lg:flex lg:flex-col lg:items-center'>
          <div className='h-screen w-[100%] pt-[80px] md:pt-[90px] lg:pt-[108px]'>
            <div className='text-center'>
              <h1 className='mt-[86px] text-[40px] font-[700] leading-[65px] md:text-[48px] lg:text-[60px]'>
                <span className='hidden md:inline'>Fessior</span> URL Shortener
              </h1>
              <p className='mb-[46px] leading-[24px] md:text-[24px] lg:text-[28px] lg:leading-[65px]'>
                Simplify, Organize, and Share: <br className='md:hidden' /> URL Management Made Easy
              </p>
            </div>
            <div className='relative mb-[172px] items-start rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] bg-white p-[24px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] lg:w-[100%]'>
              {isLoaded ? (
                isLoggedIn ? (
                  <div className='items-start md:flex'>
                    <div className='md:flex-grow'>
                      <div>
                        <h6 className='mb-[8px] font-[500] md:mb-[8px] md:text-[20px] lg:text-[28px]'>Your long URL</h6>
                        <div className='mb-[8px] md:mb-[20px]'>
                          <Input
                            height={inputHeight}
                            iconSrc='icons/shorten/link.svg'
                            iconAlt='link'
                            placeholder='Input the URL you want to shorten'
                            textValue={longUrl}
                            onInput={setLongUrl}
                            onEnter={handleSubmit}
                            divider
                            fontSize={inputFontSize}
                            tabIndex={1}
                            autoFocus
                          />
                        </div>
                        <div className='inline-block md:flex md:max-w-[85%] md:justify-between lg:w-[85%]'>
                          <div className='mb-[8px] flex items-center justify-between md:mb-0 md:me-[12px] md:inline-flex'>
                            <p className='inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
                              Organization
                            </p>
                            <Input
                              collapseIcon
                              height={inputHeight}
                              className='ms-[4px] w-[200px] md:ms-[8px]'
                              fontSize={inputFontSize}
                              textValue={organizationValue!.shortName}
                              dropdownOptions={organizationOptions!}
                              onDropdownSelect={
                                handleChange(ShortenInputFieldEnum.ORGANIZATION) as (
                                  value: ShortenInputFieldType,
                                ) => void
                              }
                            />
                          </div>
                          <div className='flex items-center justify-between md:inline-flex'>
                            <p className='inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
                              Domain
                            </p>
                            <Input
                              collapseIcon
                              height={inputHeight}
                              className='ms-[4px] w-[200px] md:ms-[8px]'
                              fontSize={inputFontSize}
                              textValue={domainValue!}
                              dropdownOptions={domainOptions!}
                              onDropdownSelect={
                                handleChange(ShortenInputFieldEnum.DOMAIN) as (value: ShortenInputFieldType) => void
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className='mt-[20px] lg:mt-[28px]'>
                        <div className='mb-[20px] md:flex md:items-center md:justify-between lg:mb-[28px]'>
                          <h6 className='mb-[4px] font-[500] md:mb-0 md:inline md:w-[130px] md:text-[20px] lg:text-[28px]'>
                            Slug
                          </h6>
                          <div className='mb-[8px] md:mb-0 md:inline-block md:flex-grow'>
                            <Input
                              fontSize={inputFontSize}
                              height={inputHeight}
                              iconSrc='icons/shorten/slug.svg'
                              iconAlt='slug'
                              placeholder='/Slug'
                              textValue={slug}
                              onInput={setSlug}
                              onEnter={handleSubmit}
                              divider
                              tabIndex={2}
                            />
                          </div>
                        </div>
                        <div className='mb-[8px] md:mb-[20px] md:flex md:items-center md:justify-between'>
                          <h6 className='mb-[4px] font-[500] md:mb-0 md:inline md:w-[130px] md:text-[20px] lg:text-[28px]'>
                            Category
                          </h6>
                          <div className='md:inline-block md:flex-grow'>
                            <Input
                              dropdownOptions={categoryOptions!}
                              dropdownValues={categoryValues}
                              onDropdownSelect={
                                handleChange(ShortenInputFieldEnum.CATEGORY) as (value: ShortenInputFieldType) => void
                              }
                              fontSize={inputFontSize}
                              height={inputHeight}
                              iconSrc='icons/shorten/search.svg'
                              iconAlt='search'
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
                              tabIndex={3}
                            />
                          </div>
                        </div>
                        {categoryValues.length > 0 && (
                          <div className='mb-[8px]'>
                            <p className='me-[12px] inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
                              Chosen categories
                            </p>
                            <ShortenCategories
                              handleChange={
                                handleChange(ShortenInputFieldEnum.CATEGORY) as (category: Category) => void
                              }
                              categories={categoryValues}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      tabIndex={4}
                      className='mt-[12px] md:relative md:top-[32px] md:ms-[12px] md:mt-0 md:text-[18px] lg:top-[46px]'
                      disabled={!allowSubmit}
                      onClick={handleSubmit}
                    >
                      Shorten
                    </Button>
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center py-[16px] md:flex-row'>
                      <p className='mb-[16px] md:mb-0 md:me-[12px] md:text-[20px] lg:text-[24px]'>
                        Let&apos;s make sharing links easier! Log in to use our URL Shortener.
                      </p>
                      <Button className='self-start' onClick={() => authRouter(AuthType.LOGIN)}>
                        <span className='px-[4px] text-[20px]'>Log in</span>
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div>Loading</div>
              )}
              <div className='absolute left-[-15px] top-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
              <div className='absolute bottom-[-15px] right-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
            </div>
          </div>
          <div className='text-center md:flex md:flex-col md:items-center'>
            <h2 className='text-[36px] font-[700] leading-[65px]'>Fessior Tools</h2>
            <p className='text-center leading-[24px] md:max-w-[640px]'>
              Your one-stop destination for essential utilities. Discover a world of community-driven tools that
              simplify your daily tasks.
            </p>

            <ShortenTools />
          </div>
        </div>
        <div className='absolute right-[-10px] top-[100px] z-[-10] h-[40px] w-[40px] rounded-full bg-primary lg:top-[130px]'></div>
        <div className='absolute left-[40px] top-[145px] z-[-10] h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className='absolute left-[-70px] top-[580px] z-[-10] h-[120px] w-[120px] rounded-full bg-primary md:top-[679px]'></div>
        <div className='absolute bottom-[9px] right-[-30px] z-[-10] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] z-[-10] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
      {/* SHORTEN MODAL */}
      {shortenedUrl && (
        <ModalShorten
          shortenedUrl={shortenedUrl}
          onDismiss={() => {
            setShortenedUrl(null);
            clearForm();
          }}
        />
      )}
      {/* TOAST */}
      <CustomToastContainer />
    </>
  );
}
