import { waitFor } from '@testing-library/react';
import usePodcastEpisodes, { getPodcastDetailsKey } from '../../hooks/usePodcastEpisodes';
import { getMockedEpisodes } from '../data/podcastsEpisodesData';
import { setStoredData } from '../../utils/storedDataUtils';
import IRawPodcastData from '../../models/IRawPodcastData';
import { getMockedFetch } from '../mocks/fetch';
import { renderHookWithWrapper } from '../mocks/contexts/appSettings-utils';

const id = '0';

const mockedEpisodes = getMockedEpisodes();
const rawPodcastData: IRawPodcastData = {
  resultCount: 200,
  results: mockedEpisodes
}
const mockedFetch = getMockedFetch({
  json: () => Promise.resolve({
    contents: JSON.stringify(rawPodcastData),
  }),
}) as any;

describe('usePodcastEpisodes hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should return the data when called and return ', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    const { result } = renderHookWithWrapper(() => usePodcastEpisodes(id));

    await waitFor(() => {
      const { episodes } = result.current;
      expect(episodes).toHaveLength(mockedEpisodes.length - 1);
      expect(mockedFetch).toBeCalled();
    });
  });

  it('should not call fetch if data is already in localStorage', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    setStoredData(getPodcastDetailsKey(id), rawPodcastData);

    const { result } = renderHookWithWrapper(() => usePodcastEpisodes(id));

    await waitFor(() => {
      const { episodes } = result.current;
      expect(episodes).toHaveLength(mockedEpisodes.length - 1);
      expect(mockedFetch).not.toBeCalled();
    });
  });

  it('should log an error if fetch fails', async () => {
    const mockedErrorFetch = jest.fn(() => Promise.reject());
    jest.spyOn(window, 'fetch').mockImplementation(mockedErrorFetch);

    const mockedConsoleError = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(mockedConsoleError);

    renderHookWithWrapper(() => usePodcastEpisodes(id));

    await waitFor(() => {
      expect(mockedErrorFetch).toBeCalled();
      expect(mockedConsoleError).toBeCalled();
    });
  });

  it('getEpisodeById should return undefined if there is no match', async () => {
    setStoredData(getPodcastDetailsKey(id), rawPodcastData);

    const { result } = renderHookWithWrapper(() => usePodcastEpisodes(id));

    await waitFor(() => {
      const { getEpisodeById } = result.current;
      const episode = getEpisodeById('1000');
      expect(episode).toBeFalsy();
    });
  });
});