export const inBrowser = typeof window !== 'undefined'

export function isAndroid(): boolean {
  /* istanbul ignore next */
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false;
}

export function isIOS(): boolean {
  /* istanbul ignore next */
  return inBrowser
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    : false;
}
