import {
  ShortenerDescription,
  ShortenerStatistics,
  QRGeneratorDescription,
  QRGeneratorStatistics,
  CertificateDescription,
  CertificateStatistics,
  CalendarDescription,
  CalendarStatistics,
  CodeWithMeDescription,
  CodeWithMeStatistics,
  QNADescription,
  QNAStatistics,
} from '@/app/(home)/components/AvailableTools/AvailableToolInfos';

export const homeAvailableToolComponents: {
  [key in string]: { description: () => JSX.Element; statistics: () => JSX.Element | null };
} = {
  'URL Shortener': {
    description: ShortenerDescription,
    statistics: ShortenerStatistics,
  },
  'QR Generator': {
    description: QRGeneratorDescription,
    statistics: QRGeneratorStatistics,
  },
  'GDSC Certificate': {
    description: CertificateDescription,
    statistics: CertificateStatistics,
  },
  'GDSC Calendar': {
    description: CalendarDescription,
    statistics: CalendarStatistics,
  },
  'Code with Me': {
    description: CodeWithMeDescription,
    statistics: CodeWithMeStatistics,
  },
  'GDSC Q&A': {
    description: QNADescription,
    statistics: QNAStatistics,
  },
};
