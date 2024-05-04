import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Input from '@/components/input';

import userService from '../../../src/services/user';
import { BaseOrganization } from '../../../src/types/organization';
import DomainList from '../DomainList';

import UserDropdownList from './UserDropdownList';

import User from '@/types/user-type';

type OrganizationFormProps = {
  organizationDetails: BaseOrganization;
  setOrganizationDetails: (organization: BaseOrganization) => void;
  isLongNameValid: boolean;
};

const OrganizationForm = forwardRef(
  (
    props: OrganizationFormProps,
    longNameContainerRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { organizationDetails, setOrganizationDetails, isLongNameValid } =
      props;
    const [members, setMembers] = useState<User[] | null>(null);

    const nonManagingUsers = organizationDetails.members.filter(
      (member) =>
        !organizationDetails.managers.find(
          (manager) => manager._id === member._id,
        ),
    );

    const nonParticipatingUsers = members?.filter(
      (member) =>
        !organizationDetails.members.find(
          (organizationUser) => organizationUser._id === member._id,
        ),
    );

    useEffect(() => {
      (async () => {
        try {
          const initialUsers = await userService.getAllUsers();
          setMembers(initialUsers);
        } catch (e: any) {
          toast.error(e.message);
        }
      })();
    }, []);

    return (
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
              onUsersChange={(users: User[]) => {
                setOrganizationDetails({
                  ...organizationDetails,
                  managers: users,
                });
              }}
              options={nonManagingUsers}
              isManagerList
            />
          </div>
          {nonParticipatingUsers && (
            <div className='mb-8'>
              <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
                Members
              </h6>
              <UserDropdownList
                users={organizationDetails.members}
                onUsersChange={(users: User[]) => {
                  setOrganizationDetails({
                    ...organizationDetails,
                    members: users,
                  });
                }}
                options={nonParticipatingUsers}
                blockDeleteIds={organizationDetails.managers.map(
                  (manager) => manager._id,
                )}
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
