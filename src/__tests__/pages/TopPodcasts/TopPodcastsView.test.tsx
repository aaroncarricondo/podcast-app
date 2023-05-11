import { render, screen } from '@testing-library/react';

import * as AppSettings from '../../../contexts/AppSettings';
import TopPodcastsView from '../../../pages/TopPodcasts/TopPodcastsView';

const mockedAppSettingsReturn = (isLoading = false) => {
  return {
    removeOperation: jest.fn(),
    addOperation: jest.fn(),
    isLoading,
  };
};

jest.spyOn(AppSettings, 'useAppSettings')
  .mockImplementation(() => mockedAppSettingsReturn(true));

describe('Top podcast view', () => {
  it('should render cards with skeleton while loading', () => {
    jest.spyOn(AppSettings, 'useAppSettings')
      .mockImplementation(() => {
        return mockedAppSettingsReturn(true);
      });

    render(<TopPodcastsView podcasts={[]} onSearchChange={jest.fn()} />);

    expect(screen.getAllByTestId('loading-podcast-card')).toHaveLength(8);

  });
});
