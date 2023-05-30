import { render, screen } from '@testing-library/react';

import PodcastDetailsContainer from '../../../pages/PodcastDetails';
import * as useTopPodcasts from '../../../hooks/useTopPodcasts';
import { mockedPodcast } from '../../data/podcastsData';
import { renderWithWrapper } from '../../mocks/contexts/appSettings-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => jest.fn(),
  useParams: () => jest.fn(() => {
    return { podcastId: '1234567890' };
  }),
}));

jest.spyOn(useTopPodcasts, 'default')
  .mockImplementation(() => ({
    topPodcasts: [mockedPodcast],
    getPodcastById: jest.fn((id: string) => {
      return { id, ...mockedPodcast };
    }),
  }));

describe('Podcast details container', () => {
  it('should podcast details', () => {
    renderWithWrapper(<PodcastDetailsContainer />);

    expect(screen.queryByText(mockedPodcast.title)).toBeTruthy();
    expect(screen.queryByText(`by ${mockedPodcast.author}`)).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.summary)).toBeTruthy();
  });
});