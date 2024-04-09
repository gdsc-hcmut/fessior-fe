import { Tool } from '@/types/tool-type';

export const tools: Tool[] = [
  {
    name: 'URL Shortener',
    description:
      'Link shortening service with free-of-charge advanced management features.',
    iconFilenames: ['shortener.svg', 'shortener_1.svg'],
    secondaryIconClass: 'right-[-8%] top-[20%] w-[50%]',
    decorImgSrc: '/images/home/side_shortener.png',
    imgAlt: 'shortener',
    active: true,
    url: '/shorten',
  },
  {
    name: 'QR Generator',
    description:
      'Customize, brand, and share information.\nCraft QR codes for your unique needs.',
    iconFilenames: ['qr.svg', 'qr_1.svg'],
    secondaryIconClass: 'right-[4px] top-0 w-[32%]',
    decorImgSrc: '/images/home/side_shortener.png',
    primaryIconClass: 'relative z-[1] h-auto w-[84%] text-red-500',
    imgAlt: 'qr',
    active: false,
    url: '',
  },
  {
    name: 'GDSC Certificate',
    description:
      'Easily create, edit, export, and share certificates on our user-friendly platform.',
    iconFilenames: ['cert.svg', 'cert_1.svg'],
    secondaryIconClass: 'top-[8px] right-[-8px] w-[32%]',
    decorImgSrc: '/images/home/side_shortener.png',
    imgAlt: 'cert',
    active: false,
    url: '',
  },
  {
    name: 'GDSC Calendar',
    description:
      'Effortlessly manage your calendar, create schedules, and oversee daily events.',
    iconFilenames: ['calendar.svg', 'calendar_1.svg'],
    secondaryIconClass: 'top-[4px] right-[-8px] w-[52%]',
    decorImgSrc: '/images/home/side_shortener.png',
    imgAlt: 'calendar',
    active: false,
    url: '',
  },
  {
    name: 'Code with Me',
    description:
      'Code together in real-time on our collaborative code-sharing website.',
    iconFilenames: ['codewithme.svg', 'codewithme_1.svg'],
    secondaryIconClass: 'w-[28%] top-[4px] right-[-6px]',
    decorImgSrc: '/images/home/side_shortener.png',
    imgAlt: 'code-with-me',
    active: false,
    url: '',
  },
  {
    name: 'GDSC Q&A',
    description:
      'Get answers and career advice from tech-savvy consultants or school experts.',
    iconFilenames: ['qna.svg', 'qna_1.svg'],
    secondaryIconClass: 'top-[8px] right-[-4px] w-[32%]',
    decorImgSrc: '/images/home/side_shortener.png',
    imgAlt: 'qna',
    active: false,
    url: '',
  },
];