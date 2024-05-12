import { Ref, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import Input from '@/components/input';

import userService from '../../../src/services/user';
import { BaseOrganization } from '../../../src/types/organization';
import User from '../../../src/types/user';
import DomainList from '../DomainList';

import UserDropdownList from './UserDropdownList';

type OrganizationFormProps = {
  organizationDetails: BaseOrganization;
  isLongNameValid: boolean;
  setOrganizationDetails: (organization: BaseOrganization) => void;
};

const OrganizationForm = forwardRef(
  (
    { organizationDetails, isLongNameValid, setOrganizationDetails }: OrganizationFormProps,
    longNameInputRef: Ref<HTMLDivElement>,
  ) => {
    const [allUsers, setAllUsers] = useState<User[] | null>(null);

    const isManager = useCallback(
      (member: User) => organizationDetails.managers.find((manager) => manager._id === member._id),
      [organizationDetails],
    );

    const isMember = useCallback(
      (user: User) => organizationDetails.members.find((member) => member._id === user._id),
      [organizationDetails],
    );

    const nonManagingMembers = useMemo(
      () => organizationDetails.members.filter((member) => !isManager(member)),
      [organizationDetails, isManager],
    );

    const nonMemberUsers = useMemo(() => allUsers?.filter((user) => !isMember(user)), [allUsers, isMember]);

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

    return (
      <div className='overflow-auto px-9 py-4'>
        <div className='mb-8' ref={longNameInputRef}>
          <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
            Long Name <i className='text-base'>(*)</i>
          </h6>
          <Input
            textValue={organizationDetails.longName}
            onInput={(longName: string) => setOrganizationDetails({ ...organizationDetails, longName })}
          />
          {!isLongNameValid && <p className='font-light italic text-red'>This field must not be blank!</p>}
        </div>

        <div className='mb-8'>
          <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>Short Name</h6>
          <Input
            textValue={organizationDetails.shortName}
            onInput={(shortName: string) => setOrganizationDetails({ ...organizationDetails, shortName })}
          />
        </div>
        <div className='mb-8'>
          <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>Domains</h6>
          <DomainList
            onDomainsChange={(domains: string[]) => setOrganizationDetails({ ...organizationDetails, domains })}
            domains={organizationDetails.domains}
          />
        </div>
        <div className='flex flex-col'>
          <div className='mb-8'>
            <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>Managers</h6>
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
              <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>Members</h6>
              <UserDropdownList
                users={organizationDetails.members}
                onChangeUsers={(users: User[]) => {
                  setOrganizationDetails({
                    ...organizationDetails,
                    members: users,
                  });
                }}
                options={nonMemberUsers}
                blockDeleteIds={organizationDetails.managers.map((manager) => manager._id)}
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);

OrganizationForm.displayName = 'OrganizationForm';

export default OrganizationForm;
