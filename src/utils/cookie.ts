export function setCookie(key: string, value: string, time: number): void {
  const cur = new Date();
  cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
  document.cookie = `${key}=${encodeURIComponent(value)};expires=${time ? cur.toUTCString() : ''}}`
}

export function getCookie(key: string): string {
  const data = document.cookie;
  let startIndex = data.indexOf(key + '=');
  if (startIndex > -1) {
    startIndex = startIndex + key.length + 1;
    let endIndex = data.indexOf(';', startIndex);
    endIndex = endIndex < 0 ? data.length : endIndex;
    return decodeURIComponent(data.substring(startIndex, endIndex));
  } else {
    return '';
  }
}

export function delCookie(key: string): void {
  setCookie(key, '', -1);
}