import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = [...searchParams.entries()];

  const paramsToUrl = (items: [string, string][]) => {
    return items.map((item) => item.join('=')).join('&');
  };

  const setItem = (newItems: { [key: string]: string }) => {
    router.replace(
      pathname +
        '?' +
        paramsToUrl(
          items.filter((item) => !Object.keys(newItems).includes(item[0])),
        ) +
        paramsToUrl(Object.keys(newItems).map((key) => [key, newItems[key]])),
    );
  };

  const removeItem = (...args: string[]) => {
    router.replace(
      pathname +
        '?' +
        paramsToUrl(items.filter((item) => !args.includes(item[0]))),
    );
  };

  return { setItem, removeItem };
}
