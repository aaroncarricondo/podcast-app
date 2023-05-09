import { render, screen } from '@testing-library/react';
import PodcastDetailsView from '../../../pages/PodcastDetails/PodcastDetailsView';
import IPodcast from '../../../models/IPodcast';

const mockedPodcast: IPodcast = {
  id: '1',
  title: 'Mocked podcast',
  author: 'Mocked author',
  summary: 'Mocked summary',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/GitHub_logo_2013.svg/480px-GitHub_logo_2013.svg.png'
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Podcast details view', () => {
  it('should podcast details', () => {
    render(<PodcastDetailsView podcast={mockedPodcast} />);

    expect(screen.queryByText(mockedPodcast.title)).toBeTruthy();
    expect(screen.queryByText(`by mockedPodcast.author`)).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.summary)).toBeTruthy();
  });
});