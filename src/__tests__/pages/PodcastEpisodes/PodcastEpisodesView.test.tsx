import { fireEvent, render, screen } from '@testing-library/react';
import PodcastEpisodesView from "../../../pages/PodcastEpisodes/PodcastEpisodesView";
import MockedMemoryRouter from "../../mocks/MemoryRouter";
import { getMockedEpisodes, mockedEpisode } from '../../data/podcastsEpisodesData';


describe('Podcast episodes view', () => {
  it('should navigate to episode details when title clicked', () => {
    const episodes = getMockedEpisodes();
    const trackCount = 200;
    const testRouteText = 'Navigated';

    render(
      <MockedMemoryRouter
        initialEntries={[`/podcast/1`]}
        mainRouteProps={{
          path: 'podcast/:podcastId',
          element: <PodcastEpisodesView trackCount={trackCount} episodes={episodes} />,
        }}
        otherRoutesProps={[
          {
            path: 'podcast/:podcastId/:episodeId',
            element: testRouteText,
          }
        ]}
      />
    );
    expect(screen.queryByText(trackCount, { exact: false })).toBeTruthy();

    // Act
    fireEvent.click(screen.getAllByText(mockedEpisode.trackName).at(0));

    expect(screen.queryByText(testRouteText)).toBeTruthy();
  });
});