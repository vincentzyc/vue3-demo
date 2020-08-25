import { isNaN } from './number';
import { getType } from '../index'

export function isDate(val: Date): val is Date {
  return (
    getType(val) === 'Date' &&
    !isNaN(val.getTime())
  );
}
