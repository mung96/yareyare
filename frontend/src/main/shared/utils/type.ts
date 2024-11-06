export function neverExpected(value: never): never {
  throw new Error('never타입이 와야합니다.' + `${value}`);
}

export function convertCharToNumber(ch: string) {
  return ch.charCodeAt(0);
}

export function convertNumberToChar(num: number) {
  return String.fromCharCode(num);
}
