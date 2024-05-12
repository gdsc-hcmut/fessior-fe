import Organization from '../../../src/types/organization';

import OrganizationItem from './OrganizationItem';

type OrganizationListProps = {
  organizations: Organization[];
  setEditingOrganizationIndex: (index: number) => void;
};

export default function OrganizationList({
  organizations,
  setEditingOrganizationIndex,
}: OrganizationListProps) {
  return (
    <div>
      <div className='mb-4 flex px-6'>
        <div className='flex-[1] text-lg font-semibold text-primary'>No.</div>
        <div className='flex-[5] text-lg font-semibold text-primary'>Name</div>
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
        {organizations?.map((organization, index) => (
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
  );
}
