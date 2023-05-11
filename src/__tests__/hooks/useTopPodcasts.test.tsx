import { renderHook, waitFor } from '@testing-library/react';
import useTopPodcasts, { topPodcastsKey } from '../../hooks/useTopPodcasts';
import { getMockedPodcasts, getMockedRawPodcasts } from '../data/podcastsData';
import { setStoredData } from '../../utils/storedDataUtils';

const mockedRawPodcasts = getMockedRawPodcasts();
const mockedFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      feed: {
        entry: mockedRawPodcasts,
      }
    }),
  })
);
window.fetch = mockedFetch as any;

describe('useTopPodcast hook', () => {
  it('should return the data when called and return ', async () => {
    const { result } = renderHook(() => useTopPodcasts());

    await waitFor(() => {
      const { topPodcasts } = result.current;
      expect(topPodcasts).toHaveLength(mockedRawPodcasts.length);
      expect(mockedFetch).toBeCalled();
    });
  });

  it('should not call fetch if data is already in localStorage', async () => {
    setStoredData(topPodcastsKey, getMockedPodcasts());

    const { result } = renderHook(() => useTopPodcasts());

    await waitFor(() => {
      const { topPodcasts } = result.current;
      expect(topPodcasts).toHaveLength(mockedRawPodcasts.length);
      expect(mockedFetch).not.toBeCalled();
    });
  });
});