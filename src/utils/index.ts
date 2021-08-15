type StringObj = { [k: string]: string }
type UrlParamBack = null | string | StringObj

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
 * @param {String} name 参数名称(不传则返回一个全部参数对象)
 */
export function getUrlParam(name = ''): UrlParamBack {
  const href = window.location.href, i = href.indexOf("?");
  if (i < 0) return null;
  const str = href.slice(i);
  if (!str) return null;
  const arr = str.match(/([^?&=#]+)=([^?&=#/]*)/g);
  if (!arr) return null;
  const obj: StringObj = {}
  arr.forEach(v => {
    const temp = v.split('=');
    if (temp.length > 0) {
      obj[temp[0]] = temp[1];
    }
  })
  if (name) return obj[name]
  return obj
}