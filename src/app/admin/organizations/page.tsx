'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/button';
import CustomToastContainer from '@/components/custom-toast-container';
import Input from '@/components/input';

import searchIcon from '../src/assets/search.svg';
import organizationService from '../src/services/organization';
import Organization, { BaseOrganization } from '../src/types/organization';

import OrganizationList from './components/OrganizationList';
import CreateOrganizationModal from './components/OrganizationModal/CreateOrganizationModal';
import EditOrganizationModal from './components/OrganizationModal/EditOrganizationModal';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[] | null>(null);
  const [editingOrganizationIndex, setEditingOrganizationIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const organizationsInitial = await organizationService.getAllOrganizations();
        setOrganizations(organizationsInitial);
      } catch (e: any) {
        toast.error(e.message);
      }
    })();
  }, []);

  const handleOrganizationDelete = useCallback(
    async (id: string) => {
      try {
        await organizationService.deleteOrganization(id);
        setOrganizations(organizations?.filter((org) => org._id !== id) ?? null);
        setEditingOrganizationIndex(null);
        toast.success('Organization deleted successfully');
      } catch (e: any) {
        toast.error(e.message);
      }
    },
    [organizations],
  );

  const handleOrganizationUpdate = useCallback(
    async (organization: Organization) => {
      try {
        await organizationService.updateOrganization(organization);
        setOrganizations(organizations?.map((org) => (org._id === organization._id ? organization : org)) ?? null);
        setEditingOrganizationIndex(null);
        toast.success('Organization updated successfully');
      } catch (e: any) {
        toast.error(e.message);
      }
    },
    [organizations],
  );

  const handleOrganizationCreate = useCallback(
    async (organization: BaseOrganization) => {
      try {
        const newOrganization = await organizationService.createOrganization(organization);
        setOrganizations(organizations?.concat(newOrganization) ?? null);
        setIsCreating(false);
        toast.success('Organization created successfully');
      } catch (e: any) {
        toast.error(e.message);
      }
    },
    [organizations],
  );

  const filteredOrganizations = useMemo(
    () => organizations?.filter((organization) => organization.longName.toLowerCase().includes(search.toLowerCase())),
    [search, organizations],
  );

  return (
    <div className='flex flex-col px-5 pt-28 md:px-20 xl:px-60'>
      <div className='mb-4 md:mb-8'>
        <h1 className='mb-1 text-4xl font-bold text-primary md:text-5xl'>Organizations</h1>
        <p className='md:text-xl'>Manage organizations throughout Fessior Tools</p>
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
      </div>
      {filteredOrganizations && (
        <OrganizationList
          organizations={filteredOrganizations}
          setEditingOrganizationIndex={setEditingOrganizationIndex}
        />
      )}
      {editingOrganizationIndex !== null && organizations && (
        <EditOrganizationModal
          organization={organizations[editingOrganizationIndex]}
          onCancel={() => {
            setEditingOrganizationIndex(null);
          }}
          onUpdate={handleOrganizationUpdate}
          onDelete={() => handleOrganizationDelete(organizations[editingOrganizationIndex]._id)}
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
