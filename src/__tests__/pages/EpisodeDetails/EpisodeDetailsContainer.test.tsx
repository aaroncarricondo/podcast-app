import { render, screen } from '@testing-library/react';

import IPodcast from '../../../models/IPodcast';
import * as usePodcastEpisodes from '../../../hooks/usePodcastEpisodes';
import EpisodeDetailsContainer from '../../../pages/EpisodeDetails';
import IPodcastTrack from '../../../models/IPodcastTrack';

const mockedEpisode: IPodcastTrack = {
  trackId: 1,
  trackName: 'Mocked track',
  description: 'Mocked track description',
  releaseDate: '',
  trackTimeMillis: 309000,
  episodeUrl: 'https://file-examples.com/storage/fe563fce08645a90397f28d/2017/11/file_example_MP3_700KB.mp3',
};

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