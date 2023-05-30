import { render, screen } from '@testing-library/react';
import PodcastFilterer from '../../../../pages/TopPodcasts/components/PodcastFilterer';
import { spyOnAppSettings } from '../../../mocks/contexts/appSettings-utils';

spyOnAppSettings(true);

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