import { render, screen } from '@testing-library/react';
import PodcastEpisodes from '../../../pages/PodcastEpisodes';
import * as usePodcastEpisodes from '../../../hooks/usePodcastEpisodes';
import { BrowserRouter } from 'react-router-dom';
import { getMockedEpisodes, mockedEpisode } from '../../data/podcastsEpisodesData';
import { spyOnAppSettings } from '../../mocks/contexts/appSettings-utils';

const trackCount = 200;
const episodes = getMockedEpisodes();
jest.spyOn(usePodcastEpisodes, 'default')
  .mockImplementation(() => ({
    episodes,
    trackCount,
    getEpisodeById: jest.fn(),
  }));

describe('Podcast episodes container', () => {
  spyOnAppSettings(false);

  it('should render podcast episodes', () => {
    render(<PodcastEpisodes />, { wrapper: BrowserRouter });

    expect(screen.queryByText(`Episodes: ${trackCount}`)).toBeTruthy();
    expect(screen.queryAllByText(mockedEpisode.trackName)).toHaveLength(episodes.length)
  });
});