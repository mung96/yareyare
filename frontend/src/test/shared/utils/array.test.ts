import {includeObjectWithKeyAndValue} from '@/main/utils/array.ts';

describe('배열에 만족하는 객체가 있는지 검사하는 함수', () => {
  it('key 배열, value 배열을 입력하면 만족하는 객체가 있는지 검사', () => {
    const arr = [
      {row: 1, col: 'A'},
      {row: 1, col: 'B'},
      {row: 2, col: 'C'},
    ];
    const resultInclude = includeObjectWithKeyAndValue(
      arr,
      ['row', 'col'],
      [1, 'A'],
    );
    const resultNotInclude = includeObjectWithKeyAndValue(
      arr,
      ['row', 'col'],
      [2, 'D'],
    );
    expect(resultInclude).toBe(true);
    expect(resultNotInclude).toBe(false);
  });

  it('key 배열, value 배열을 원소가 3개일 때', () => {
    const arr = [
      {row: 1, col: 'A', plus: 23},
      {row: 1, col: 'B', plus: 2},
      {row: 2, col: 'C', plus: 4},
    ];
    const resultInclude = includeObjectWithKeyAndValue(
      arr,
      ['row', 'col', 'plus'],
      [1, 'A', 23],
    );
    const resultNotInclude = includeObjectWithKeyAndValue(
      arr,
      ['row', 'col', 'plus'],
      [1, 'A', 3],
    );
    expect(resultInclude).toBe(true);
    expect(resultNotInclude).toBe(false);
  });
});
