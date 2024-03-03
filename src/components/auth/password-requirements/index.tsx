import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { validatePassword } from '@/utils/auth';

type PasswordRequirementsProps = {
  currentPassword: string;
  className?: string;
};

export default function PasswordRequirements(props: PasswordRequirementsProps) {
  const { currentPassword, className } = props;
  const requirements = [
    'Be between 6 and 16 characters',
    'Contain at least one lowercase and one uppercase character',
    'Contain at least one number and one special character',
  ];
  const [validation, setValidation] = useState(
    Array(requirements.length).fill(true),
  );

  const validationSetter = () => {
    setValidation(validatePassword(3, currentPassword));
  };

  useEffect(validationSetter, [currentPassword]);

  const itemClass = (index: number) =>
    clsx(
      'relative left-[-8px]',
      currentPassword !== '' && (validation[index] ? 'text-green' : 'text-red'),
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
        {requirements.map((requirement, index) => (
          <li key={requirement}>
            <span className={itemClass(index)}>{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
