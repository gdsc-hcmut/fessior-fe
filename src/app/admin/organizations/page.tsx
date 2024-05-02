'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/button';
import CustomToastContainer from '@/components/custom-toast-container';
import Input from '@/components/input';

import searchIcon from '../src/assets/search.svg';
import organizationService from '../src/services/organization';
import Organization, { BaseOrganization } from '../src/types/organization';

import CreateOrganizationModal from './CreateOrganizationModal';
import EditOrganizationModal from './EditOrganizationModal';
import OrganizationItem from './OrganizationItem';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null,
  );
  const [editingOrganizationIndex, setEditingOrganizationIndex] = useState<
    number | null
  >(null);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const organizationsInitial =
          await organizationService.getAllOrganizations();
        setOrganizations(organizationsInitial);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, []);

  const handleOrganizationDelete = async (id: string) => {
    try {
      await organizationService.deleteOrganization(id);
      setOrganizations(organizations?.filter((org) => org._id !== id) ?? null);
      setEditingOrganizationIndex(null);
      toast.success('Organization deleted successfully');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleOrganizationUpdate = async (organization: Organization) => {
    try {
      await organizationService.updateOrganization(organization);
      setOrganizations(
        organizations?.map((org) =>
          org._id === organization._id ? organization : org,
        ) ?? null,
      );
      setEditingOrganizationIndex(null);
      toast.success('Organization updated successfully');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleOrganizationCreate = async (organization: BaseOrganization) => {
    try {
      const newOrganization =
        await organizationService.createOrganization(organization);
      setOrganizations(organizations?.concat(newOrganization) ?? null);
      setIsCreating(false);
      toast.success('Organization created successfully');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

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
          <Button
            className='mb-4 h-12 self-start'
            onClick={() => {
              setIsCreating(true);
            }}
          >
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
        <div>
          <div className='mb-4 flex px-6'>
            <div className='flex-[1] text-lg font-semibold text-primary'>
              No.
            </div>
            <div className='flex-[5] text-lg font-semibold text-primary'>
              Name
            </div>
            <div className='flex-[3] text-lg font-semibold text-primary'>
              Managers
            </div>
            <div className='flex-[2] text-lg font-semibold text-primary'>
              Members
            </div>
            <div className='flex-[3] text-lg font-semibold text-primary'>
              Actions
            </div>
          </div>
          <div>
            {displayingOrganizations?.map((organization, index) => (
              <OrganizationItem
                key={organization._id}
                organization={organization}
                index={index + 1}
                onEdit={() => {
                  setEditingOrganizationIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {editingOrganizationIndex !== null && organizations && (
        <EditOrganizationModal
          organization={organizations[editingOrganizationIndex]}
          onCancel={() => {
            setEditingOrganizationIndex(null);
          }}
          onUpdate={handleOrganizationUpdate}
          onDelete={() =>
            handleOrganizationDelete(
              organizations[editingOrganizationIndex]._id,
            )
          }
        />
      )}
      {isCreating && (
        <CreateOrganizationModal
          onCancel={() => {
            setIsCreating(false);
          }}
          onCreate={handleOrganizationCreate}
        />
      )}

      <CustomToastContainer />
    </div>
  );
}
