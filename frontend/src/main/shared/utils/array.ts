export function includeObjectWithKeyAndValue<T>(
  array: T[],
  keys: (keyof T)[],
  values: T[keyof T][],
) {
  return array.some(obj =>
    keys.every((key, index) => obj[key] === values[index]),
  );
}
