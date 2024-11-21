//날짜를 추가해주는 기능

import {changeSelectedDate} from '@/main/services/helper';

describe('changeSelectedDate', () => {
  it('YYYY-MM-DD를 넣었을 때 선택됐다는 객체 반환', () => {
    const result = changeSelectedDate('2024-10-29');
    expect(result).toStrictEqual({'2024-10-29': {selected: true}});
  });
});
