'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/button';
import Input from '@/components/input';

import searchIcon from '../src/assets/search.svg';
import organizationService from '../src/services/organization';
import Organization from '../src/types/organization';

import OrganizationList from './components/OrganizationList';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null,
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const organizationsInitial =
          await organizationService.getAllOrganizations();
        setOrganizations(organizationsInitial);
      } catch (e: any) {
        toast.error(e.message);
      }
    })();
  }, []);

  const displayingOrganizations = useMemo(
    () =>
      organizations?.filter((organization) =>
        organization.longName.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, organizations],
  );

  return (
    <div className='flex flex-col px-5 pt-28 md:px-20 xl:px-60'>
      <div className='mb-4 md:mb-8'>
        <h1 className='mb-1 text-4xl font-bold text-primary md:text-5xl'>
          Organizations
        </h1>
        <p className='md:text-xl'>
          Manage organizations throughout Fessior Tools
        </p>
      </div>
      <div>
        <div className='md:mb-6 md:flex md:flex-row-reverse md:justify-between'>
          <Button className='mb-4 h-12 self-start' onClick={() => {}}>
            + Create Organization
          </Button>
          <Input
            height={44}
            className='md:w-2/3 xl:w-1/2'
            textValue={search}
            iconAlt='search'
            iconSrc={searchIcon}
            iconPosition='left'
            divider
            placeholder='Search by organization name'
            onInput={(value) => {
              setSearch(value);
            }}
          />
        </div>
      </div>
      {displayingOrganizations && (
        <OrganizationList organizations={displayingOrganizations} />
      )}
    </div>
  );
}
