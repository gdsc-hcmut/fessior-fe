import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/button';
import CloseButton from '@/components/close-button';
import Input from '@/components/input';

import userService from '../../../src/services/user';
import { BaseOrganization } from '../../../src/types/organization';
import DomainList from '../DomainList';

import UserDropdownList from './UserDropdownList';

import User from '@/types/user-type';

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
  const longNameContainerRef = useRef<HTMLDivElement>(null);

  const [allUsers, setAllUsers] = useState<User[] | null>(null);

  const nonManagingMembers = useMemo(
    () =>
      organizationDetails.members.filter(
        (member) =>
          !organizationDetails.managers.find(
            (manager) => manager._id === member._id,
          ),
      ),
    [organizationDetails],
  );

  const nonMemberUsers = useMemo(
    () =>
      allUsers?.filter(
        (member) =>
          !organizationDetails.members.find(
            (organizationMember) => organizationMember._id === member._id,
          ),
      ),
    [allUsers, organizationDetails],
  );

  useEffect(() => {
    (async () => {
      try {
        const initialUsers = await userService.getAllUsers();
        setAllUsers(initialUsers);
      } catch (e: any) {
        toast.error(e.message);
      }
    })();
  }, []);

  const handleSaveButtonClick = useCallback(() => {
    if (organizationDetails.longName === '' && longNameContainerRef.current) {
      longNameContainerRef.current.scrollIntoView({
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
        <div className='overflow-auto px-9 py-4'>
          <div className='mb-8' ref={longNameContainerRef}>
            <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
              Long Name <i className='text-base'>(*)</i>
            </h6>
            <Input
              textValue={organizationDetails.longName}
              onInput={(longName: string) =>
                setOrganizationDetails({ ...organizationDetails, longName })
              }
            />
            {!isLongNameValid && (
              <p className='font-light italic text-red'>
                This field must not be blank!
              </p>
            )}
          </div>

          <div className='mb-8'>
            <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
              Short Name
            </h6>
            <Input
              textValue={organizationDetails.shortName}
              onInput={(shortName: string) =>
                setOrganizationDetails({ ...organizationDetails, shortName })
              }
            />
          </div>
          <div className='mb-8'>
            <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
              Domains
            </h6>
            <DomainList
              onDomainsChange={(domains: string[]) =>
                setOrganizationDetails({ ...organizationDetails, domains })
              }
              domains={organizationDetails.domains}
            />
          </div>
          <div className='flex flex-col'>
            <div className='mb-8'>
              <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
                Managers
              </h6>
              <UserDropdownList
                users={organizationDetails.managers}
                onChangeUsers={(users: User[]) => {
                  setOrganizationDetails({
                    ...organizationDetails,
                    managers: users,
                  });
                }}
                options={nonManagingMembers}
                isManagerList
              />
            </div>
            {nonMemberUsers && (
              <div className='mb-8'>
                <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
                  Members
                </h6>
                <UserDropdownList
                  users={organizationDetails.members}
                  onChangeUsers={(users: User[]) => {
                    setOrganizationDetails({
                      ...organizationDetails,
                      members: users,
                    });
                  }}
                  options={nonMemberUsers}
                  blockDeleteIds={organizationDetails.managers.map(
                    (manager) => manager._id,
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <div className='relative flex w-full justify-end border-t-[1px] bg-white px-9 py-4'>
          {onDelete && (
            <button
              onClick={onDelete}
              className='me-3 rounded-lg bg-red px-4 py-2 text-white transition-all hover:bg-[#ca3326]'
            >
              Delete Organization
            </button>
          )}
          <Button onClick={handleSaveButtonClick}>{saveButtonText}</Button>
        </div>
      </div>
    </div>
  );
}
