import { render, screen } from '@testing-library/react';
import PodcastEpisodes from '../../../pages/PodcastEpisodes';
import * as usePodcastEpisodes from '../../../hooks/usePodcastEpisodes';
import { BrowserRouter } from 'react-router-dom';
import { getMockedEpisodes, mockedEpisode } from '../../data/podcastsEpisodesData';
import * as AppSettings from '../../../contexts/AppSettings';

const trackCount = 200;
const episodes = getMockedEpisodes();
jest.spyOn(usePodcastEpisodes, 'default')
  .mockImplementation(() => ({
    episodes,
    trackCount,
    getEpisodeById: jest.fn(),
  }));

const mockedAppSettingsReturn = (isLoading = false) => {
  return {
    removeOperation: jest.fn(),
    addOperation: jest.fn(),
    isLoading,
  };
};

describe('Podcast episodes container', () => {
  jest.spyOn(AppSettings, 'useAppSettings')
    .mockImplementation(() => mockedAppSettingsReturn(false));

  it('should render podcast episodes', () => {
    render(<PodcastEpisodes />, { wrapper: BrowserRouter });

    expect(screen.queryByText(`Episodes: ${trackCount}`)).toBeTruthy();
    expect(screen.queryAllByText(mockedEpisode.trackName)).toHaveLength(episodes.length)
  });
});