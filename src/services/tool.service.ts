export type Tool = {
  name: string;
  desc: string;
  imgSrc: string[];
  secondaryImgPos: string;
  imgAlt: string;
  active: boolean;
  url: string;
};

export const tools: Tool[] = [
  {
    name: 'URL Shortener',
    desc: 'Link shortening service with free-of-charge advanced management features',
    imgSrc: ['images/home/shortener.svg', 'images/home/shortener_1.svg'],
    secondaryImgPos: 'top-[-4px] right-[-8px] lg:right-0',
    imgAlt: 'shortener',
    active: true,
    url: '/shorten',
  },
  {
    name: 'QR Generator',
    desc: 'Customize, brand, and share information.\nCraft QR codes for your unique needs.',
    imgSrc: ['images/home/qr.svg', 'images/home/qr_1.svg'],
    secondaryImgPos: 'top-[-4px] right-[36px] md:right-[-4px] lg:right-[16px]',
    imgAlt: 'qr',
    active: false,
    url: '',
  },
  {
    name: 'GDSC Certificate',
    desc: 'Easily create, edit, export, and share certificates on our user-friendly platform.',
    imgSrc: ['images/home/cert.svg', 'images/home/cert_1.svg'],
    secondaryImgPos:
      'top-[-8px] right-[8px] md:right-[-8px] lg:top-[-6px] lg:right-[0px]',
    imgAlt: 'cert',
    active: false,
    url: '',
  },
  {
    name: 'GDSC Calendar',
    desc: 'Effortlessly manage your calendar, create schedules, and oversee daily events.',
    imgSrc: ['images/home/calendar.svg', 'images/home/calendar_1.svg'],
    secondaryImgPos:
      'top-[-4px] right-[24px] md:right-[-8px] lg:right-0 lg:top-0',
    imgAlt: 'calendar',
    active: false,
    url: '',
  },
  {
    name: 'Code with Me',
    desc: 'Code together in real-time on our collaborative code-sharing website.',
    imgSrc: ['images/home/codewme.svg', 'images/home/codewme_1.svg'],
    secondaryImgPos: 'top-[-8px] right-[12px] md:right-[-8px] lg:right-0',
    imgAlt: 'codewme',
    active: false,
    url: '',
  },
  {
    name: 'GDSC Q&A',
    desc: 'Get answers and career advice from tech-savvy consultants or school experts.',
    imgSrc: ['images/home/qna.svg', 'images/home/qna_1.svg'],
    secondaryImgPos: 'top-[-8px] right-[8px] md:right-[-12px] lg:right-0',
    imgAlt: 'qna',
    active: false,
    url: '',
  },
];
