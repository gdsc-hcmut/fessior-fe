import { clsx } from 'clsx';
import Link from 'next/link';

export default function NotFound() {
  const cls = clsx('bg-blue-500 text-red-50');

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className={cls} href='/'>
        Return Home
      </Link>
    </div>
  );
}
