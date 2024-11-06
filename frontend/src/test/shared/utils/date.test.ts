import {convertDateToDateString} from 'src/main/utils';
import dayjs from 'dayjs';

describe('Dayjs 형식의 날짜를 YYYY-MM-DD 형식으로 바꿔주는 함수', () => {
  it('2024-10-29을 YYYY-MM-DD로 바꾸는 에러', () => {
    const day = dayjs('2024-10-29 10:30:25');
    expect(convertDateToDateString(day)).toBe('2024-10-29');
  });

  it('9시간 간격 차이를 잡아주는지 테스트', () => {
    const day = dayjs('2024-10-29 02:00:00');

    // IOSString()을 사용하면 9시간 차이가 나는데, 이런 에러가 없게 테스트.
    expect(day.toISOString()).not.toBe('2024-10-29');

    expect(convertDateToDateString(day)).toBe('2024-10-29');
  });
});
