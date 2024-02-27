'use client';

import { useState, useEffect, useContext } from 'react';

import Button from '@/components/button';
import CategoryItem from '@/components/category-item';
import SelectInput from '@/components/select-input';
import ShortenModal from '@/components/shorten-modal';
import ShortenTools from '@/components/shorten-tools';
import TextInput from '@/components/text-input';
import AuthContext from '@/contexts/authContext';
import useScreenSize from '@/hooks/useScreenSize';
import meService from '@/libs/api/me';
import urlService from '@/services/url.service';
import Organization from '@/types/organization-type';
import ScreenSize from '@/types/screen-size-enum';
import Url from '@/types/url-type';

export default function Shorten() {
  const [organizationOptions, setOrganizationOptions] = useState<
    null | Organization[]
  >(null);
  const [organizationValue, setOrganizationValue] =
    useState<null | Organization>(null);
  const [domainValue, setDomainValue] = useState('');
  const [domainOptions, setDomainOptions] = useState<null | string[]>(null);
  const [longUrl, setLongUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<null | Url>(null);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const { screenSize, loaded } = useScreenSize();

  const { meProfile, isAuthStatusReady } = useContext(AuthContext);

  useEffect(() => {
    if (!meProfile) return;

    (async () => {
      try {
        const organizationOptionsInitial = await meService.getOrganization();
        setOrganizationOptions(organizationOptionsInitial);
        setDomainOptions(organizationOptionsInitial[0].domains);
        setOrganizationValue(organizationOptionsInitial[0]);
        setDomainValue(organizationOptionsInitial[0].domains[0]);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, [meProfile]);

  useEffect(() => {
    if (organizationValue) {
      setDomainOptions(organizationValue.domains);
      setDomainValue(organizationValue.domains[0]);
    }
  }, [organizationValue]);

  useEffect(() => {
    if (longUrl.length > 0) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [longUrl]);

  const handleChange = (mode: string) => {
    switch (mode) {
      case 'organization':
        return (value: Organization) => {
          setOrganizationValue(value);
        };
      case 'domain':
        return (value: string) => {
          setDomainValue(value);
        };
      default:
        return () => {};
    }
  };

  const handleSubmit = async () => {
    if (allowSubmit)
      setShortenedUrl(
        await urlService.shorten({
          originalUrl: longUrl,
          slug: slug.length ? slug : null,
          domain: domainValue,
          organizationId: organizationValue?._id,
        } as Url),
      );
  };

  const clearForm = () => {
    setLongUrl('');
    setSlug('');
  };

  const inputFontSize = screenSize === ScreenSize.LG ? 16 : undefined;
  const inputHeight = screenSize === ScreenSize.LG ? 48 : undefined;

  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden pt-[80px] leading-[1.2] text-primary md:pt-[90px] lg:pt-[108px]'>
        <div className='px-[20px] md:max-w-[1000px] lg:flex lg:flex-col lg:items-center'>
          <div className='text-center'>
            <h1 className='mt-[86px] text-[40px] font-[700] leading-[65px] md:text-[48px] lg:text-[60px]'>
              <span className='hidden md:inline'>Fessior</span> URL Shortener
            </h1>
            <p className='mb-[46px] leading-[24px] md:text-[24px] lg:text-[28px] lg:leading-[65px]'>
              Simplify, Organize, and Share: <br className='md:hidden' /> URL
              Management Made Easy
            </p>
          </div>
          <div className='relative mb-[172px] items-start rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] bg-white p-[24px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] lg:w-[100%]'>
            {isAuthStatusReady && loaded ? (
              <div className='items-start md:flex'>
                <div className='md:flex-grow'>
                  <div>
                    <h6 className='mb-[8px] font-[500] md:mb-[8px] md:text-[20px] lg:text-[28px]'>
                      Your long URL
                    </h6>
                    <div className='mb-[8px] md:mb-[20px]'>
                      <TextInput
                        height={inputHeight}
                        iconSrc='icons/shorten/link.svg'
                        iconAlt='link'
                        placeholder='Input the URL you want to shorten'
                        value={longUrl}
                        onInput={setLongUrl}
                        onEnter={handleSubmit}
                        divider
                        fontSize={inputFontSize}
                      />
                    </div>
                    {meProfile &&
                      organizationValue &&
                      organizationOptions &&
                      domainOptions && (
                        <div className='inline-block md:flex md:max-w-[85%] md:justify-between lg:w-[85%]'>
                          <div className='mb-[8px] flex items-center justify-between md:mb-0 md:me-[12px] md:inline-flex'>
                            <p className='inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
                              Organization
                            </p>
                            <SelectInput
                              fontSize={inputFontSize}
                              value={organizationValue}
                              options={organizationOptions}
                              onChange={
                                handleChange('organization') as (
                                  value: string | Organization,
                                ) => void
                              }
                              className='ms-[4px] w-[200px] md:ms-[8px]'
                              height={inputHeight}
                            />
                          </div>
                          <div className='flex items-center justify-between md:inline-flex'>
                            <p className='inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
                              Domain
                            </p>
                            <SelectInput
                              fontSize={inputFontSize}
                              value={domainValue}
                              options={domainOptions}
                              onChange={
                                handleChange('domain') as (
                                  value: string | Organization,
                                ) => void
                              }
                              className='ms-[4px] w-[200px] md:ms-[8px]'
                              height={inputHeight}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                  {meProfile && (
                    <div className='mt-[20px] lg:mt-[28px]'>
                      <div className='mb-[20px] md:flex md:items-center md:justify-between lg:mb-[28px]'>
                        <h6 className='mb-[4px] font-[500] md:mb-0 md:inline md:w-[130px] md:text-[20px] lg:text-[28px]'>
                          Slug
                        </h6>
                        <div className='mb-[8px] md:mb-0 md:inline-block md:flex-grow'>
                          <TextInput
                            fontSize={inputFontSize}
                            height={inputHeight}
                            iconSrc='icons/shorten/slug.svg'
                            iconAlt='slug'
                            placeholder='/Slug'
                            value={slug}
                            onInput={setSlug}
                            onEnter={handleSubmit}
                            divider
                          />
                        </div>
                      </div>
                      <div className='mb-[8px] md:mb-[20px] md:flex md:items-center md:justify-between'>
                        <h6 className='mb-[4px] font-[500] md:mb-0 md:inline md:w-[130px] md:text-[20px] lg:text-[28px]'>
                          Category
                        </h6>
                        <div className='md:inline-block md:flex-grow'>
                          <TextInput
                            fontSize={inputFontSize}
                            height={inputHeight}
                            iconSrc='icons/shorten/search.svg'
                            iconAlt='search'
                            placeholder='Add or create categories'
                            value={''}
                            onInput={() => {}}
                            divider
                          />
                        </div>
                      </div>
                      <div className='mb-[8px]'>
                        <p className='me-[12px] inline text-[12px] font-[500] text-black md:text-[16px] lg:text-[20px]'>
                          Chosen categories
                        </p>
                        <div className='inline'>
                          <CategoryItem text='Event' />
                          <CategoryItem text='Favorite' />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  className='mt-[12px] md:relative md:top-[32px] md:ms-[12px] md:mt-0 md:text-[18px] lg:top-[46px]'
                  disabled={!allowSubmit}
                  onClick={handleSubmit}
                >
                  Shorten
                </Button>
              </div>
            ) : (
              <div>Loading</div>
            )}
            <div className='absolute left-[-15px] top-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
            <div className='absolute bottom-[-15px] right-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
          </div>
          <div className='text-center md:flex md:flex-col md:items-center'>
            <h2 className='text-[36px] font-[700] leading-[65px]'>
              Fessior Tools
            </h2>
            <p className='text-center leading-[24px] md:max-w-[640px]'>
              Your one-stop destination for essential utilities. Discover a
              world of community-driven tools that simplify your daily tasks.
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
      {/* MODAL */}
      {shortenedUrl && (
        <ShortenModal
          shortenedUrl={shortenedUrl}
          onDismiss={() => {
            setShortenedUrl(null);
            clearForm();
          }}
        />
      )}
    </>
  );
}
