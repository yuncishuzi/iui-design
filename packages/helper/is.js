const opt = Object.prototype.toString;
export function isArray(obj) {
  return opt.call(obj) === "[object Array]";
}
export function isString(obj) {
  return opt.call(obj) === "[object String]";
}
export function isNumber(obj) {
  return opt.call(obj) === "[object Number]";
}
export function isBoolean(obj) {
  return opt.call(obj) === "[object Boolean]";
}
export function isNull(obj) {
  return opt.call(obj) === "[object Null]";
}
export function isUndefined(obj) {
  return obj === undefined;
}
export function isObject(obj) {
  return opt.call(obj) === "[object Object]";
}
export function isEmpty(obj) {
  if (isNull(obj) || isUndefined(obj)) return true;
  if (isString(obj) || isArray(obj)) return obj.length === 0;
  if (isObject(obj)) return Object.keys(obj).length === 0;
  return false;
}
