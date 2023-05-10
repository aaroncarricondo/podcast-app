import { fireEvent, render, screen } from '@testing-library/react';
import PodcastDetailsView from '../../../pages/PodcastDetails/PodcastDetailsView';
import IPodcast from '../../../models/IPodcast';
import * as AppSettings from '../../../contexts/AppSettings';

const mockedPodcast: IPodcast = {
  id: '1',
  title: 'Mocked podcast',
  author: 'Mocked author',
  summary: 'Mocked summary',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/GitHub_logo_2013.svg/480px-GitHub_logo_2013.svg.png'
};

const mockedAppSettingsReturn = (isLoading = false) => {
  return {
    removeOperation: jest.fn(),
    addOperation: jest.fn(),
    isLoading,
  };
};

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedNavigate,
}));


describe('Podcast details view', () => {
  it('should render podcast details', () => {
    jest.spyOn(AppSettings, 'useAppSettings')
      .mockImplementation(() => {
        return mockedAppSettingsReturn();
      });
    render(<PodcastDetailsView podcast={mockedPodcast} />);

    expect(screen.queryByText(mockedPodcast.title)).toBeTruthy();
    expect(screen.queryByText(`by ${mockedPodcast.author}`)).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.summary)).toBeTruthy();
  });

  it('should render podcast details empty', () => {
    jest.spyOn(AppSettings, 'useAppSettings')
      .mockImplementation(() => {
        return mockedAppSettingsReturn();
      });
    render(<PodcastDetailsView podcast={undefined} />);

    expect(screen.queryByText('Description:')).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.title)).toBeFalsy();
    expect(screen.queryByText('by')).toBeTruthy();
    expect(screen.queryByText(mockedPodcast.summary)).toBeFalsy();
  });

  it('should navigate when some of the clickable text is clicked', () => {
    jest.spyOn(AppSettings, 'useAppSettings')
      .mockImplementation(() => {
        return mockedAppSettingsReturn();
      });
    render(<PodcastDetailsView podcast={mockedPodcast} />);

    fireEvent.click(screen.queryByText(mockedPodcast.title));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });
});