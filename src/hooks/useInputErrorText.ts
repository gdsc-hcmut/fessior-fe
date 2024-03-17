import { useState, useCallback } from 'react';

export default function useInputErrorText(fieldNumber: number) {
  const [inputErrorTexts, setInputErrorTexts] = useState(
    Array(fieldNumber).fill(''),
  );

  const setInputErrorText = useCallback((index: number, newText: string) => {
    setInputErrorTexts((inputErrorTexts) =>
      inputErrorTexts.map((text, currentIndex) =>
        currentIndex === index ? newText : text,
      ),
    );
  }, []);

  return { inputErrorTexts, setInputErrorText };
}
