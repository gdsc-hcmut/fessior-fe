import Image from 'next/image';

import deleteIcon from '../../src/assets/delete.svg';
import TooltipWrapper from '../../src/components/TooltipWrapper';
import Position from '../../src/types/position';

type DeleteButtonProps = {
  onClick: () => void;
  isDisabled?: boolean;
};

export default function DeleteButton({ onClick, isDisabled }: DeleteButtonProps) {
  return (
    <TooltipWrapper
      tooltipText={'This member is a manager, remove them as manager first.'}
      isDisabled={!isDisabled}
      position={Position.LEFT}
    >
      <button
        onClick={onClick}
        disabled={isDisabled}
        className='inline-block h-full rounded-lg bg-red px-3 py-2 transition-all hover:bg-[#ca3326] disabled:cursor-not-allowed disabled:bg-[#fcc]'
      >
        <Image src={deleteIcon} alt='' width={0} height={0} className='' />
      </button>
    </TooltipWrapper>
  );
}
