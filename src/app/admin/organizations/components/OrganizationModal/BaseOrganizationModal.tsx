import { MouseEvent, useCallback, useRef, useState } from 'react';

import Button from '@/components/button';
import CloseButton from '@/components/close-button';

import { BaseOrganization } from '../../../src/types/organization';

import OrganizationForm from './OrganizationForm';

type BaseOrganizationModalProps = {
  title: string;
  saveButtonText?: string;
  organizationDetails: BaseOrganization;
  setOrganizationDetails: (organization: BaseOrganization) => void;
  onSave: () => void;
  onDelete?: () => void;
  onCancel: () => void;
};

export default function BaseOrganizationModal({
  title,
  saveButtonText = 'Save',
  organizationDetails,
  setOrganizationDetails,
  onSave,
  onDelete,
  onCancel,
}: BaseOrganizationModalProps) {
  const [isLongNameValid, setIsLongNameValid] = useState(true);
  const longNameInputRef = useRef<HTMLDivElement>(null);

  const handleSaveButtonClick = useCallback(() => {
    if (organizationDetails.longName === '' && longNameInputRef.current) {
      longNameInputRef.current.scrollIntoView({
        behavior: 'smooth',
      });
      setIsLongNameValid(false);
      return;
    }

    onSave();
  }, [onSave, organizationDetails.longName]);

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
          <h1 className='text-2xl font-bold text-primary'>{title}</h1>
        </div>
        <OrganizationForm
          organizationDetails={organizationDetails}
          setOrganizationDetails={setOrganizationDetails}
          isLongNameValid={isLongNameValid}
          ref={longNameInputRef}
        />
        <div className='relative flex w-full justify-end border-t-[1px] bg-white px-9 py-4'>
          {onDelete ? (
            <button
              onClick={onDelete}
              className='me-3 rounded-lg bg-red px-4 py-2 text-white transition-all hover:bg-[#ca3326]'
            >
              Delete Organization
            </button>
          ) : null}
          <Button onClick={handleSaveButtonClick}>{saveButtonText}</Button>
        </div>
      </div>
    </div>
  );
}
