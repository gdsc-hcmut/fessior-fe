import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const setItem = (
    newItems: { [key: string]: string | undefined },
    newPath?: string,
  ) => {
    Object.keys(newItems).forEach((key) => {
      const newItem = newItems[key];
      if (newItem) params.set(key, newItem);
      else params.delete(key);
    });
    router.push((newPath ?? pathname) + '?' + params.toString());
  };

  const removeItem = (items: string[], newPath?: string) => {
    items.forEach((key) => params.delete(key));
    router.push((newPath ?? pathname) + '?' + params.toString());
  };

  return { setItem, removeItem };
}
