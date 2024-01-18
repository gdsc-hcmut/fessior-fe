import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const setItem = (newItems: { [key: string]: string }) => {
    Object.keys(newItems).forEach((key) => params.set(key, newItems[key]));
    router.push(pathname + '?' + params.toString());
  };

  const removeItem = (...args: string[]) => {
    args.forEach((key) => params.delete(key));
    router.push(pathname + '?' + params.toString());
  };

  return { setItem, removeItem };
}
