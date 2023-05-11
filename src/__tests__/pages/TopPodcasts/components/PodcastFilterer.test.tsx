import { render, screen } from '@testing-library/react';

import * as AppSettings from '../../../../contexts/AppSettings';
import PodcastFilterer from '../../../../pages/TopPodcasts/components/PodcastFilterer';

const mockedAppSettingsReturn = (isLoading = false) => {
  return {
    removeOperation: jest.fn(),
    addOperation: jest.fn(),
    isLoading,
  };
};

jest.spyOn(AppSettings, 'useAppSettings')
  .mockImplementation(() => mockedAppSettingsReturn(true));

describe('Podcast filterer', () => {
  const badgeCount = 100;

  it('should not display badge counter if its loading', () => {
    render(<PodcastFilterer badgeCount={badgeCount} onSearchChange={jest.fn()} />);

    expect(screen.queryByText(badgeCount)).toBeFalsy();
  });

  it('input should be disabled if its loading', () => {
    render(<PodcastFilterer badgeCount={badgeCount} onSearchChange={jest.fn()} />);

    expect(screen.getByTestId('podcast-filterer-input')).toBeDisabled();
  });
});