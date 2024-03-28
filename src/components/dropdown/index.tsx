import { ReactNode } from 'react';

type DropdownProps = {
  positionTop: number;
  children: ReactNode | ReactNode[];
};

export default function Dropdown(props: DropdownProps) {
  const { positionTop, children } = props;

  return (
    <div
      style={{ top: `${positionTop}px` }}
      className='absolute z-[1] w-[100%] overflow-hidden rounded-[8px] border-t-[1px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
    >
      {children}
    </div>
  );
}
