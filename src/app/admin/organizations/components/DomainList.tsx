import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';

import checkIcon from '../../src/assets/check.svg';
import closeIcon from '../../src/assets/close.svg';
import { removeDuplicateStrings } from '../../src/utils/common';

import DeleteButton from './DeleteButton';

type DomainListProps = {
  domains: string[];
  onDomainsChange: (domains: string[]) => void;
};

export default function DomainList(props: DomainListProps) {
  const { domains, onDomainsChange } = props;
  const [isAdding, setIsAdding] = useState(false);
  const [domainInput, setDomainInput] = useState<null | string>(null);

  const handleAddDomain = () => {
    if (domainInput && domainInput !== '') {
      const newDomains = removeDuplicateStrings(domainInput.split(' ')).filter(
        (domain) => !domains.find((dom) => dom === domain),
      );

      onDomainsChange([...domains, ...newDomains]);
      setDomainInput(null);
      setIsAdding(false);
    } else setIsAdding(false);
  };

  return (
    <div>
      {isAdding ? (
        <div className='mb-3 flex flex-col'>
          <div className='mb-2 flex'>
            <Input
              textValue={domainInput ?? ''}
              iconAlt='close'
              iconPosition='right'
              iconSrc={closeIcon}
              onIconClick={() => {
                setDomainInput(null);
                setIsAdding(false);
              }}
              onInput={setDomainInput}
              autoFocus
              className='me-3'
              onEnter={handleAddDomain}
            />
            <Button className='whitespace-nowrap' onClick={handleAddDomain}>
              <Image
                src={checkIcon}
                alt='check'
                width={0}
                height={0}
                className=''
              />
            </Button>
          </div>
          <p className='text-base italic text-primary'>
            Add multiple domains by separating them with a space.
          </p>
        </div>
      ) : (
        <Button
          className='mb-3 mt-1'
          onClick={() => {
            setIsAdding(true);
          }}
        >
          + Add Domains
        </Button>
      )}
      <div className='rounded-lg'>
        {domains.map((domain) => (
          <DomainItem
            key={domain}
            onDelete={(deletingDomain: string) => {
              onDomainsChange(
                domains.filter(
                  (currentDomain) => currentDomain !== deletingDomain,
                ),
              );
            }}
            domain={domain}
          />
        ))}
      </div>
    </div>
  );
}

type DomainItemProps = {
  domain: string;
  onDelete: (domain: string) => void;
};

function DomainItem(props: DomainItemProps) {
  const { domain, onDelete } = props;

  return (
    <div className='flex items-center justify-between border-b-[1px] p-2'>
      {domain}
      <DeleteButton onClick={() => onDelete(domain)} />
    </div>
  );
}
