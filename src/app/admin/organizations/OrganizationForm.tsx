import { useEffect, useRef, useState } from 'react';

import Input from '@/components/input';
import User from '@/types/user-type';

import userService from '../src/services/user';
import { BaseOrganization } from '../src/types/organization';

import DomainList from './DomainList';
import UserList from './UserList';

type OrganizationFormProps = {
  editingOrganization: BaseOrganization;
  setEditingOrganization: (organization: BaseOrganization) => void;
  isLongNameValid: boolean;
};

export default function OrganizationForm(props: OrganizationFormProps) {
  const { editingOrganization, setEditingOrganization, isLongNameValid } =
    props;
  const [members, setUsers] = useState<User[] | null>(null);
  const longNameContainerRef = useRef<HTMLDivElement>(null);

  const nonManagingUsers = editingOrganization.members.filter(
    (member) =>
      !editingOrganization.managers.find(
        (manager) => manager._id === member._id,
      ),
  );

  const nonParticipatingUsers = members?.filter(
    (member) =>
      !editingOrganization.members.find(
        (organizationUser) => organizationUser._id === member._id,
      ),
  );

  useEffect(() => {
    (async () => {
      try {
        const initialUsers = await userService.getAllUsers();
        setUsers(initialUsers);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (longNameContainerRef.current && !isLongNameValid) {
      longNameContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [longNameContainerRef, isLongNameValid]);

  return (
    <div className='overflow-auto px-9 py-4'>
      <div className='mb-8' ref={longNameContainerRef}>
        <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
          Long Name <i className='text-base'>(*)</i>
        </h6>
        <Input
          textValue={editingOrganization.longName}
          onInput={(longName: string) =>
            setEditingOrganization({ ...editingOrganization, longName })
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
          textValue={editingOrganization.shortName}
          onInput={(shortName: string) =>
            setEditingOrganization({ ...editingOrganization, shortName })
          }
        />
      </div>
      <div className='mb-8'>
        <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
          Domains
        </h6>
        <DomainList
          onDomainsChange={(domains: string[]) =>
            setEditingOrganization({ ...editingOrganization, domains })
          }
          domains={editingOrganization.domains}
        />
      </div>
      <div className='flex flex-col'>
        <div className='mb-8'>
          <h6 className='mb-2 ps-1 text-xl font-semibold text-primary'>
            Managers
          </h6>
          <UserList
            users={editingOrganization.managers}
            onUsersChange={(members: User[]) => {
              setEditingOrganization({
                ...editingOrganization,
                managers: members,
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
            <UserList
              users={editingOrganization.members}
              onUsersChange={(members: User[]) => {
                setEditingOrganization({ ...editingOrganization, members });
              }}
              options={nonParticipatingUsers}
              blockDeleteIds={editingOrganization.managers.map(
                (manager) => manager._id,
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
