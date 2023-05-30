import { screen } from '@testing-library/react';
import EpisodeDetailsView from '../../../pages/EpisodeDetails/EpisodeDetailsView';
import { mockedEpisode } from '../../data/podcastsEpisodesData';
import { renderWithWrapper } from '../../mocks/contexts/appSettings-utils';

describe('Episode details view', () => {
  it('should render episode details', () => {
    const { container } = renderWithWrapper(<EpisodeDetailsView episode={mockedEpisode} />);

    expect(screen.queryByText(mockedEpisode.trackName)).toBeTruthy();
    expect(screen.queryByText(mockedEpisode.description)).toBeTruthy();
    expect(container.querySelector('audio')).toBeTruthy();
  });

  it('should render episode details empty', () => {
    const { container } = renderWithWrapper(<EpisodeDetailsView episode={undefined} />);

    expect(screen.queryByText(mockedEpisode.trackName)).toBeFalsy();
    expect(screen.queryByText(mockedEpisode.description)).toBeFalsy();
    expect(container.querySelector('audio')).toBeTruthy();
  });
});