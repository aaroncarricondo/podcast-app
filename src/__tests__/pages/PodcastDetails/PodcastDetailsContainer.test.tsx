import { render, screen } from '@testing-library/react';

import IPodcast from '../../../models/IPodcast';
import PodcastDetailsContainer from '../../../pages/PodcastDetails';
import * as useTopPodcasts from '../../../hooks/useTopPodcasts';

const mockedPodcast: IPodcast = {
  id: '1',
  title: 'Mocked podcast',
  author: 'Mocked author',
  summary: 'Mocked summary',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/GitHub_logo_2013.svg/480px-GitHub_logo_2013.svg.png'
};

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
    render(<PodcastDetailsContainer />);

    expect(screen.queryByText(mockedPodcast.title)).toBeTruthy();
    expect(screen.queryByText(`by ${mockedPodcast.author}`)).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.summary)).toBeTruthy();
  });
});