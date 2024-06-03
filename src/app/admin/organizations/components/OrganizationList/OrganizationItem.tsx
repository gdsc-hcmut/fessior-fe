import Image from 'next/image';

import editIcon from '../../../src/assets/edit.svg';
import groupIcon from '../../../src/assets/group.svg';
import TooltipWrapper from '../../../src/components/TooltipWrapper';
import Organization from '../../../src/types/organization';
import Position from '../../../src/types/position';
import User from '../../../src/types/user';

type OrganizationItemProps = {
  organization: Organization;
  index: number;
  onEdit: () => void;
};

const MAX_MANAGERS_DISPLAY = 3;

export default function OrganizationItem({ organization, index, onEdit }: OrganizationItemProps) {
  return (
    <div className='relative mb-4 flex rounded-lg px-6 py-4 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='absolute left-0 top-0 h-full w-1 flex-[0] rounded-s-lg bg-primary' />
      <div className='flex flex-[1] items-center'>{index}</div>
      <div className='flex flex-[5] items-center font-semibold text-primary'>{organization.longName}</div>
      <ManagerList managers={organization.managers} />
      <div className='flex flex-[2] items-center'>
        {organization.members.length}
        <Image src={groupIcon} alt='group' width={0} height={0} className='ms-2' />
      </div>
      <div className='flex flex-[3] items-center'>
        <div
          className='rounded-lg border-[1px] border-primary p-1 hover:cursor-pointer hover:bg-primary-white'
          onClick={onEdit}
        >
          <Image src={editIcon} alt='edit' width={0} height={0} className='h-auto w-full' />
        </div>
      </div>
    </div>
  );
}

type ManagerListProps = {
  managers: User[];
};

function ManagerList({ managers }: ManagerListProps) {
  const visibleManagers = managers.slice(0, MAX_MANAGERS_DISPLAY);
  const hiddenManagers = managers.slice(MAX_MANAGERS_DISPLAY);

  return (
    <div className='flex flex-[3] items-center'>
      {visibleManagers.map((manager) => (
        <TooltipWrapper
          key={manager._id}
          tooltipText={`${manager.firstName} ${manager.lastName}`}
          position={Position.BOTTOM}
        >
          <Image src={manager.picture} alt='avatar' width={32} height={32} className='me-2 rounded-full' />
        </TooltipWrapper>
      ))}
      {hiddenManagers.length !== 0 && (
        <TooltipWrapper
          position={Position.RIGHT}
          tooltipText={hiddenManagers.map((manager) => manager.firstName).join(', ')}
          className='flex h-3/4 items-center rounded-lg border-[1px] border-primary p-2 text-primary hover:cursor-pointer hover:bg-primary hover:text-white'
        >
          <p>{hiddenManagers.length}+</p>
        </TooltipWrapper>
      )}
    </div>
  );
}
