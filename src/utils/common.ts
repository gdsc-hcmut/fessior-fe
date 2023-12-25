export const detectOS = (): string => {
  let osDetected;
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
export const getActiveIcon = (src: string) => {
  const srcArr = src.split('/');
  srcArr.splice(-1, 0, 'active');
  return srcArr.join('/');
};
