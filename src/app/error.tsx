'use client'; // Error components must be Client Components

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='bg-blue-500 p-[10px]'
      >
        Try again
      </button>
    </div>
  );
}
