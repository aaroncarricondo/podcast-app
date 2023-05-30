import { screen } from '@testing-library/react';
import TopPodcastsView from '../../../pages/TopPodcasts/TopPodcastsView';
import { renderWithWrapper, spyOnAppSettings } from '../../mocks/contexts/appSettings-utils';

describe('Top podcast view', () => {
  it('should render cards with skeleton while loading', () => {
    spyOnAppSettings(true);
    renderWithWrapper(<TopPodcastsView podcasts={[]} onSearchChange={jest.fn()} />);

    expect(screen.getAllByTestId('loading-podcast-card')).toHaveLength(8);

  });
});
