import { render, screen } from '@testing-library/react';

import * as usePodcastEpisodes from '../../../hooks/usePodcastEpisodes';
import EpisodeDetailsContainer from '../../../pages/EpisodeDetails';
import { mockedEpisode } from '../../data/podcastsEpisodesData';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => jest.fn(),
  useParams: () => jest.fn(() => {
    return { podcastId: '1234567890' };
  }),
}));

jest.spyOn(usePodcastEpisodes, 'default')
  .mockImplementation(() => ({
    episodes: [mockedEpisode],
    trackCount: 1,
    getEpisodeById: jest.fn((id: string) => {
      return { id, ...mockedEpisode };
    }),
  }));

describe('Podcast details container', () => {
  it('should podcast details', () => {
    render(<EpisodeDetailsContainer />);

    expect(screen.queryByText(mockedEpisode.trackName)).toBeTruthy();
    expect(screen.queryByText(mockedEpisode.description)).toBeTruthy();
  });
});