import { clsx } from 'clsx';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

type InputCodeProps = {
  value: string;
  length: number;
  onChange: (code: string) => void;
};

export default function InputCode(props: InputCodeProps) {
  const { length, onChange, value } = props;
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const typedValue = e.target.value;

    if (typedValue >= '0' && typedValue <= '9') {
      if (cursorPosition < length - 1) setCursorPosition(cursorPosition + 1);
      else if (cursorPosition === length - 1)
        inputRefs.current[cursorPosition]!.blur();
    } else if (typedValue !== '') {
      return;
    }

    onChange(
      inputRefs
        .current!.slice(0, length)
        .map((input) => input!.value)
        .join(''),
    );
  };

  const handleFocus = useCallback(() => {
    inputRefs.current[cursorPosition]!.focus();
  }, [cursorPosition]);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    handleFocus();
  };

  useEffect(() => {
    handleFocus();
  }, [cursorPosition, handleFocus]);

  useEffect(() => {
    if (value.length === 0) setCursorPosition(0);
  }, [value]);

  const inputClass = (index: number) =>
    clsx(
      'h-[116%] caret-primary aspect-square rounded-[8px] border-[1px] text-center text-[24px] text-primary focus:border-primary outline-none',
      index <= cursorPosition && cursorPosition !== 0
        ? 'border-primary'
        : 'border-[#7e7e7e4d]',
    );

  return (
    <div className='flex h-[40px] justify-around px-[20px]'>
      {[...Array(length)].map((_, index) => {
        return (
          <input
            onMouseDown={handleMouseDown}
            key={index}
            type='text'
            value={value[index] ?? ''}
            inputMode='numeric'
            maxLength={1}
            size={1}
            onChange={handleChange}
            className={inputClass(index)}
            ref={(ref) => inputRefs.current.push(ref)}
            onKeyDown={(e: any) => {
              if (e.key === 'Backspace' && e.currentTarget.value === '') {
                if (cursorPosition > 0) setCursorPosition(cursorPosition - 1);
              }
            }}
          />
        );
      })}
    </div>
  );
}
