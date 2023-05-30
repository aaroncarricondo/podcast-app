import { waitFor } from '@testing-library/react';
import useTopPodcasts, { topPodcastsKey } from '../../hooks/useTopPodcasts';
import { getMockedPodcasts, getMockedRawPodcasts } from '../data/podcastsData';
import { setStoredData } from '../../utils/storedDataUtils';
import { getMockedFetch } from '../mocks/fetch';
import { renderHookWithWrapper } from '../mocks/contexts/appSettings-utils';

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
    localStorage.clear();
  });

  it('should return the data when called and return ', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    const { result } = renderHookWithWrapper(() => useTopPodcasts());

    await waitFor(() => {
      const { topPodcasts } = result.current;
      expect(topPodcasts).toHaveLength(mockedRawPodcasts.length);
      expect(mockedFetch).toBeCalled();
    });
  });

  it('should not call fetch if data is already in localStorage', async () => {
    jest.spyOn(window, 'fetch').mockImplementation(mockedFetch);
    setStoredData(topPodcastsKey, getMockedPodcasts());

    const { result } = renderHookWithWrapper(() => useTopPodcasts());

    await waitFor(() => {
      const { topPodcasts } = result.current;
      expect(topPodcasts).toHaveLength(mockedRawPodcasts.length);
      expect(mockedFetch).not.toBeCalled();
    });
  });

  it('should log an error if fetch fails', async () => {
    const mockedErrorFetch = jest.fn(() => Promise.reject());
    jest.spyOn(window, 'fetch').mockImplementation(mockedErrorFetch);

    const mockedConsoleError = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(mockedConsoleError);

    renderHookWithWrapper(() => useTopPodcasts());

    await waitFor(() => {
      expect(mockedErrorFetch).toBeCalled();
      expect(mockedConsoleError).toBeCalled();
    });
  });
});