import { renderHook, waitFor } from '@testing-library/react';
import useTopPodcasts, { topPodcastsKey } from '../../hooks/useTopPodcasts';
import { getMockedPodcasts, getMockedRawPodcasts } from '../data/podcastsData';
import { setStoredData } from '../../utils/storedDataUtils';
import { getMockedFetch } from '../mocks/fetch';
import { wrapper } from '../mocks/test-utils';

const mockedRawPodcasts = getMockedRawPodcasts();
const mockedFetch = getMockedFetch({
  json: () => Promise.resolve({
    contents: JSON.stringify({
      feed: {
        entry: mockedRawPodcasts,
      }
    }),
  }),
}) as any;

describe('useTopPodcast hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the data when called and return ', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    const { result } = renderHook(() => useTopPodcasts(), { wrapper });

    await waitFor(() => {
      const { topPodcasts } = result.current;
      expect(topPodcasts).toHaveLength(mockedRawPodcasts.length);
      expect(mockedFetch).toBeCalled();
    });
  });

  it('should not call fetch if data is already in localStorage', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    setStoredData(topPodcastsKey, getMockedPodcasts());

    const { result } = renderHook(() => useTopPodcasts(), { wrapper });

    await waitFor(() => {
      const { topPodcasts } = result.current;
      expect(topPodcasts).toHaveLength(mockedRawPodcasts.length);
      expect(mockedFetch).not.toBeCalled();
    });
  });
});