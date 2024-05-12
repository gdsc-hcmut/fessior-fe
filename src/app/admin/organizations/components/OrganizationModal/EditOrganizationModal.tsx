import { useState } from 'react';

import ModalAlert from '@/components/modal-alert';

import Organization, {
  BaseOrganization,
} from '../../../src/types/organization';

import BaseOrganizationModal from './BaseOrganizationModal';

import AlertLevel from '@/types/alert-level-enum';

type EditOrganizationModalProps = {
  organization: Organization;
  onUpdate: (organization: Organization) => void;
  onCancel: () => void;
  onDelete: () => void;
};

export default function EditOrganizationModal({
  organization,
  onUpdate,
  onCancel,
  onDelete,
}: EditOrganizationModalProps) {
  const [organizationDetails, setOrganizationDetails] =
    useState<BaseOrganization>(organization);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <BaseOrganizationModal
        title='Edit Organization'
        organizationDetails={organizationDetails}
        setOrganizationDetails={setOrganizationDetails}
        onSave={() =>
          onUpdate({ ...organizationDetails, _id: organization._id })
        }
        onCancel={onCancel}
        onDelete={() => setIsDeleting(true)}
      />
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
    </>
  );
}
