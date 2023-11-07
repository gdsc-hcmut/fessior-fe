import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className='bg-blue-500  text-red-50 ' href='/'>
        Return Home
      </Link>
    </div>
  );
}
