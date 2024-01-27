import Icon from '@/types/icon-enum';

export const detectOS = (): string => {
  let osDetected;
  if (typeof window === 'undefined') {
    console.log('Hello');
    return 'others';
  }
  console.log(typeof window === 'undefined', typeof window);
  if (navigator.userAgent.match(/Android/i)) {
    osDetected = 'android';
  } else if (navigator.userAgent.match(/BlackBerry/i)) {
    osDetected = 'blackBerry';
  } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    osDetected = 'ios';
  } else if (navigator.userAgent.match(/Opera Mini/i)) {
    osDetected = 'opera';
  } else if (
    navigator.userAgent.match(/IEMobile/i) ||
    navigator.userAgent.match(/WPDesktop/i)
  ) {
    osDetected = 'windows';
  } else {
    osDetected = 'other';
  }
  return osDetected;
};
export const getCurrentYear = () => {
  return new Date().getFullYear();
};
export const getIcon = (
  iconLocation: string,
  filename: string,
  mode: Icon | null,
) => {
  let iconPath = '';

  iconPath +=
    iconLocation[iconLocation.length - 1] === '/'
      ? iconLocation
      : iconLocation + '/';
  iconPath += mode === null ? '' : mode + '/';
  iconPath += filename;

  return iconPath;
};
