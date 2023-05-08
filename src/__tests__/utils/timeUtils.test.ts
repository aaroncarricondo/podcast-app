import { millisToMinutesAndSeconds } from '../../utils/timeUtils';

describe('Get formatted podcast duration', () => {
  it('seconds are lower than 10', () => {
    const time = millisToMinutesAndSeconds(309000);

    expect(time).toBe('5:09');
  });

  it('seconds are equal or greater than 10', () => {
    const time = millisToMinutesAndSeconds(310000);

    expect(time).toBe('5:10');
  });

  it('milliseconds not provided', () => {
    const time = millisToMinutesAndSeconds(undefined);

    expect(time).toBe('-');
  });
});