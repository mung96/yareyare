export function includeObjectWithKeyAndValue<T>(
  array: T[],
  keys: (keyof T)[],
  values: T[keyof T][],
) {
  return array.some(obj =>
    keys.every((key, index) => obj[key] === values[index]),
  );
}

export function addItemToArray<T>(arr: Array<T>, item: T) {
  return [...arr, item];
}

export function removeItemFromArray<T>(
  arr: Array<T>,
  item: T,
  condition: (item: T) => boolean,
) {
  return arr.filter(item => condition(item));
}
