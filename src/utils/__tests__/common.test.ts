import { detectOS } from '../common';

describe('`detectOS', () => {
  it('detects the correct operating system', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 10; SM-G975F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36',
      configurable: true,
    });
    expect(detectOS()).toBe('android');

    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
      configurable: true,
    });

    expect(detectOS()).toBe('ios');

    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (BlackBerry; U; BlackBerry 9320; en-GB) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.398 Mobile Safari/534.11+',
    });
    expect(detectOS()).toEqual('blackBerry');

    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Opera/9.80 (J2ME/MIDP; Opera Mini/4.2/28.3590; U; en) Presto/2.8.119 Version/11.10',
    });
    expect(detectOS()).toEqual('opera');

    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    });
    expect(detectOS()).toEqual('other');
  });
});
