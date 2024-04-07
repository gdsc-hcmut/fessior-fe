import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { validatePassword, passwordRequirements } from '@/utils/auth';

type PasswordRequirementsProps = {
  currentPassword: string;
  className?: string;
};

export default function PasswordRequirements(props: PasswordRequirementsProps) {
  const { currentPassword, className } = props;
  const [validations, setValidations] = useState(
    Array(passwordRequirements.length).fill(true),
  );

  useEffect(() => {
    setValidations(validatePassword(currentPassword));
  }, [currentPassword]);

  const itemClass = (index: number) =>
    clsx(
      'relative left-[-8px]',
      currentPassword !== '' &&
        (validations[index] ? 'text-green' : 'text-red'),
    );

  return (
    <div
      className={clsx(
        'mt-[8px] text-[12px] font-[500] md:text-[10px] lg:text-[12px]',
        className,
      )}
    >
      <p className='mb-[4px]'>Password must:</p>
      <ul className='list-inside list-disc'>
        {passwordRequirements.map((requirement, index) => (
          <li key={requirement}>
            <span className={itemClass(index)}>{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
