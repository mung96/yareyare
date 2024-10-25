import {add, sub} from '@/a';

test('add test', () => {
  const result = add(1, 2);
  expect(result).toBe(3);
});

test('sub test', () => {
  const result = sub(1, 2);
  expect(result).toBe(-1);
});
