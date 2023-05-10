import { render, screen } from '@testing-library/react';
import EpisodeDetailsView from '../../../pages/EpisodeDetails/EpisodeDetailsView';
import IPodcastTrack from '../../../models/IPodcastTrack';

const mockedEpisode: IPodcastTrack = {
  trackId: 1,
  trackName: 'Mocked track',
  description: 'Mocked track description',
  releaseDate: '',
  trackTimeMillis: 309000,
  episodeUrl: 'https://file-examples.com/storage/fe563fce08645a90397f28d/2017/11/file_example_MP3_700KB.mp3',
};

describe('Episode details view', () => {
  it('should render episode details', () => {
    const { container } = render(<EpisodeDetailsView episode={mockedEpisode} />);

    expect(screen.queryByText(mockedEpisode.trackName)).toBeTruthy();
    expect(screen.queryByText(mockedEpisode.description)).toBeTruthy();
    expect(container.querySelector('audio')).toBeTruthy();
  });

  it('should render episode details empty', () => {
    const { container } = render(<EpisodeDetailsView episode={undefined} />);

    expect(screen.queryByText(mockedEpisode.trackName)).toBeFalsy();
    expect(screen.queryByText(mockedEpisode.description)).toBeFalsy();
    expect(container.querySelector('audio')).toBeTruthy();
  });
});