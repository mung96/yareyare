export function neverExpected(value: never): never {
  throw new Error('never타입이 와야합니다.' + `${value}`);
}
