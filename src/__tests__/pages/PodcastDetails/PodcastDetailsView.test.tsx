import { fireEvent, render, screen } from '@testing-library/react';
import PodcastDetailsView from '../../../pages/PodcastDetails/PodcastDetailsView';
import * as AppSettings from '../../../contexts/AppSettings';
import { BrowserRouter } from 'react-router-dom';
import MockedMemoryRouter from '../../mocks/MemoryRouter';
import { mockedPodcast } from '../../data/podcastsData';

const mockedAppSettingsReturn = (isLoading = false) => {
  return {
    removeOperation: jest.fn(),
    addOperation: jest.fn(),
    isLoading,
  };
};

jest.spyOn(AppSettings, 'useAppSettings')
  .mockImplementation(() => mockedAppSettingsReturn());

describe('Podcast details view', () => {
  it('should render podcast details empty', () => {
    render(<PodcastDetailsView podcast={undefined} />, { wrapper: BrowserRouter });

    expect(screen.queryByText('Description:')).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.title)).toBeFalsy();
    expect(screen.queryByText('by')).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.summary)).toBeFalsy();
  });

  it('should navigate when actual route is not the same and clickable text is clicked', () => {
    const testRouteText = 'Navigated';
    render(
      <MockedMemoryRouter
        initialEntries={[`/podcast/${mockedPodcast.id}/1`]}
        mainRouteProps={{
          path: 'podcast/:podcastId/:episodeId',
          element: <PodcastDetailsView podcast={mockedPodcast} />,
        }}
        otherRoutesProps={[
          {
            path: 'podcast/:podcastId',
            element: testRouteText,
          }
        ]}
      />
    );

    fireEvent.click(screen.queryByText(mockedPodcast.title));

    expect(screen.queryByText(testRouteText)).toBeTruthy();
  });
});