
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastCard from '../../../../pages/TopPodcasts/components/PodcastCard';
import MockedMemoryRouter from '../../../mocks/MemoryRouter';
import { mockedPodcast } from '../../../data/podcastsData';
import { BrowserRouter } from 'react-router-dom';


describe('Podcast episodes view', () => {
  it('should render the card empty if podcast not provided', () => {
    render(<PodcastCard podcast={undefined} />, { wrapper: BrowserRouter });

    expect(screen.queryByText('Author:')).toBeTruthy();
  });

  it('should navigate to episode details when title clicked', () => {
    const testRouteText = 'Navigated';

    render(
      <MockedMemoryRouter
        initialEntries={[`/`]}
        mainRouteProps={{
          path: '',
          element: <PodcastCard podcast={mockedPodcast} />,
        }}
        otherRoutesProps={[
          {
            path: 'podcast/:podcastId',
            element: testRouteText,
          }
        ]}
      />
    );
    expect(screen.queryByText(mockedPodcast.title.toUpperCase())).toBeTruthy();

    // Act
    fireEvent.click(screen.getByTestId('podcast-card'));

    expect(screen.queryByText(testRouteText)).toBeTruthy();
  });
});