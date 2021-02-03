/**
 * return true when string value is valid
 * if value is not string, just check existence
 * @param value string value to check
 */
export function isValidString(value: any): boolean {
  if (typeof value === 'string') {
    return !!(value && value.trim());
  } else {
    return !!value;
  }
}

/**
 * return true when value is float format
 * @param value value
 */
export function isFloat(value: string | number): boolean {
  const floatReg = /^(([+-])?(0|([1-9][0-9]*))(\.[0-9]+)?)$/gm;

  return !!floatReg.exec(typeof value === 'string' ? value : value.toString());
}

/**
 * return true when value is integer format
 * @param value value
 */
export function isInteger(value: string | number): boolean {
  const integerReg = /^[+-]?[0-9]+$/gm;

  return !!integerReg.exec(typeof value === 'string' ? value : value.toString());
}


/**
 * return true when value is date format
 * @param value value
 */
export function isValidDate(value: string | number | Date): boolean {
  return !isNaN(new Date(value).getTime());
}

/**
 * return true when value is not undefined and not null
 * @param value value
 */
export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}
