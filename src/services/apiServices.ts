// TODO: Type defined for a custom hook that uses fetch library.
export type FetchFunction = (options: RequestInit, urlSuffix?: string) => Promise<Response>;

// This constant value should be taken from .env file
const baseUrl = 'https://itunes.apple.com/';

const getAllowOriginUrl = (url: string) => {
  return `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
};

export const lookupApiFetch: FetchFunction = (options: RequestInit, urlSuffix: string = '') => {
  const urlPrefix = 'lookup';

  return apiFetch(options, urlPrefix, urlSuffix);
};

export const topPodcastsApiFetch: FetchFunction = (options: RequestInit, urlSuffix: string = '') => {
  const urlPrefix = 'us/rss/toppodcasts';

  return apiFetch(options, urlPrefix, urlSuffix);
};

export const apiFetch = (options: RequestInit, urlPrefix: string, urlSuffix: string = '') => {
  const url = `${baseUrl}${urlPrefix}${urlSuffix}`;

  return fetch(getAllowOriginUrl(url), 
    { 
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      ...options,
    });
}