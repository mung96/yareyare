import add from './a';

test('add test', () => {
  const result = add(1, 2);
  expect(result).toBe(3);
});
