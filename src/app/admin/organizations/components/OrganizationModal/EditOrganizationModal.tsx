import { MouseEvent, useRef, useState } from 'react';

import Button from '@/components/button';
import CloseButton from '@/components/close-button';
import ModalAlert from '@/components/modal-alert';

import Organization, {
  BaseOrganization,
} from '../../../src/types/organization';

import OrganizationForm from './OrganizationForm';

import AlertLevel from '@/types/alert-level-enum';

type OrganizationModalProps = {
  organization: Organization;
  onUpdate: (organization: Organization) => void;
  onCancel: () => void;
  onDelete: () => void;
};

export default function EditOrganizationModal(props: OrganizationModalProps) {
  const { organization, onUpdate, onCancel, onDelete } = props;
  const [editingOrganization, setEditingOrganization] =
    useState<BaseOrganization>(organization);
  const [isDeleting, setIsDeleting] = useState(false);
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
              Edit Organization
            </h1>
          </div>
        </div>
        {/* FORM */}
        <OrganizationForm
          ref={longNameContainerRef}
          isLongNameValid={isLongNameValid}
          editingOrganization={editingOrganization}
          setEditingOrganization={setEditingOrganization}
        />
        <div className='relative flex w-full justify-between border-t-[1px] bg-white px-9 py-4'>
          <button
            onClick={() => setIsDeleting(true)}
            className='rounded-lg bg-red px-4 py-2 text-white transition-all hover:bg-[#ca3326]'
          >
            Delete Organization
          </button>
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

              onUpdate({ ...editingOrganization, _id: organization._id });
            }}
          >
            Save
          </Button>
        </div>
      </div>
      {isDeleting && (
        <ModalAlert
          title='Delete Organization'
          description='This action is not reversible'
          onDismiss={() => setIsDeleting(false)}
          onPrimaryAction={onDelete}
          onSecondaryAction={() => setIsDeleting(false)}
          primaryActionButtonText='Delete'
          secondaryActionButtonText='Cancel'
          type={AlertLevel.WARNING}
        />
      )}
    </div>
  );
}
