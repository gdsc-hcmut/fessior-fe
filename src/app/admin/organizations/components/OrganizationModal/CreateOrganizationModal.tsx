import { MouseEvent, useRef, useState } from 'react';

import Button from '@/components/button';
import CloseButton from '@/components/close-button';

import { BaseOrganization } from '../../../src/types/organization';

import OrganizationForm from './OrganizationForm';

type OrganizationModalProps = {
  onCreate: (organization: BaseOrganization) => void;
  onCancel: () => void;
};

export default function CreateOrganizationModal(props: OrganizationModalProps) {
  const { onCreate, onCancel } = props;
  const [editingOrganization, setEditingOrganization] =
    useState<BaseOrganization>({
      longName: '',
      shortName: '',
      managers: [],
      members: [],
      domains: [],
    });
  const [isLongNameValid, setIsLongNameValid] = useState(true);
  const longNameContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onClick={onCancel}
      className='fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/20'
    >
      <div
        onClick={(e: MouseEvent) => e.stopPropagation()}
        className='fixed bottom-0 left-0 right-0 top-0 flex flex-col bg-white md:inset-auto md:max-h-[90%] md:w-1/2 md:rounded-lg'
      >
        <div className='flex flex-col justify-between px-9 pb-4 pt-5 md:flex-row-reverse md:items-center md:border-b-[1px]'>
          <CloseButton onClick={onCancel} className='w-7' shape='square' />
          <div>
            <h1 className='text-2xl font-bold text-primary'>
              Create Organization
            </h1>
          </div>
        </div>
        <OrganizationForm
          ref={longNameContainerRef}
          isLongNameValid={isLongNameValid}
          editingOrganization={editingOrganization}
          setEditingOrganization={setEditingOrganization}
        />
        <div className='relative flex w-full justify-end border-t-[1px] bg-white px-9 py-4'>
          <Button
            onClick={() => {
              if (
                editingOrganization.longName === '' &&
                longNameContainerRef.current
              ) {
                longNameContainerRef.current.scrollIntoView({
                  behavior: 'smooth',
                });
                setIsLongNameValid(false);
                return;
              }

              onCreate(editingOrganization);
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
