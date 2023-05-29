import { renderHook, waitFor } from '@testing-library/react';
import usePodcastEpisodes, { getPodcastDetailsKey } from '../../hooks/usePodcastEpisodes';
import { getMockedEpisodes } from '../data/podcastsEpisodesData';
import { setStoredData } from '../../utils/storedDataUtils';
import IRawPodcastData from '../../models/IRawPodcastData';
import { getMockedFetch } from '../mocks/fetch';
import { wrapper } from '../mocks/test-utils';

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
  });

  it('should return the data when called and return ', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    const { result } = renderHook(() => usePodcastEpisodes(id), { wrapper });

    await waitFor(() => {
      const { episodes } = result.current;
      expect(episodes).toHaveLength(mockedEpisodes.length - 1);
      expect(mockedFetch).toBeCalled();
    });
  });

  it('should not call fetch if data is already in localStorage', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);

    setStoredData(getPodcastDetailsKey(id), rawPodcastData);

    const { result } = renderHook(() => usePodcastEpisodes(id), { wrapper });

    await waitFor(() => {
      const { episodes } = result.current;
      expect(episodes).toHaveLength(mockedEpisodes.length - 1);
      expect(mockedFetch).not.toBeCalled();
    });
  });
});