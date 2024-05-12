import { useState } from 'react';

import { BaseOrganization } from '../../../src/types/organization';

import BaseOrganizationModal from './BaseOrganizationModal';

type OrganizationModalProps = {
  onCreate: (organization: BaseOrganization) => void;
  onCancel: () => void;
};

export default function CreateOrganizationModal({ onCreate, onCancel }: OrganizationModalProps) {
  const [organizationDetails, setOrganizationDetails] = useState<BaseOrganization>({
    longName: '',
    shortName: '',
    managers: [],
    members: [],
    domains: [],
  });

  return (
    <BaseOrganizationModal
      title='Create Organization'
      saveButtonText='Create'
      organizationDetails={organizationDetails}
      setOrganizationDetails={setOrganizationDetails}
      onSave={() => onCreate(organizationDetails)}
      onCancel={onCancel}
    />
  );
}
