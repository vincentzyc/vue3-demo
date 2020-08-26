/**
 * 获取数据类型
 * @param {any} value 需要判断的值
 * @return "String","Object","Array"...
 */
export function getType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

export function isDef(val: unknown): boolean {
  return val !== undefined && val !== null;
}

export function isObject(val: unknown): val is Record<any, any> {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Object';
}

export function isArray(val: unknown): boolean {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Array';
}

export function isString(val: unknown): boolean {
  return Object.prototype.toString.call(val).slice(8, -1) === 'String';
}

/**
 * 获取url参数值
 */
export function getUrlParam(name: string) {
  let reg = new RegExp("([?&])" + name + "=([^&|^#]*)");
  let href = window.location.href;
  let index = href.indexOf("?");
  if (index < 0) return null;
  let str = href.slice(index, href.length);
  if (str) {
    let arr = str.match(reg);
    if (arr) return decodeURIComponent(arr[2]);
  }
  return null;
}