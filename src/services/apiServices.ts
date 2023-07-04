// This constant value should be taken from .env file
const baseUrl = 'https://itunes.apple.com/';

// Generic allowOrigins api fetch
export interface IAllowOriginsResponseJson {
  contents: string;
  status: {
    url: string;
    'http_code': number;
    'content_type': string;
    'response_time': number;
    'content_length': number;
  }
}

interface IAllowOriginsResponse extends Response {
  json(): Promise<IAllowOriginsResponseJson>;
};

export const apiFetch = (options: RequestInit, urlPrefix: string, urlSuffix: string = ''): Promise<IAllowOriginsResponse> => {
  const url = `${baseUrl}${urlPrefix}${urlSuffix}`;
  const allowOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

  return fetch(allowOriginsUrl, 
    { 
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      ...options,
    });
}



// Specific implementations
export type FetchFunction = (options: RequestInit, urlSuffix?: string) => Promise<IAllowOriginsResponse>;

export const lookupApiFetch: FetchFunction = (options: RequestInit, urlSuffix: string = '') => {
  const urlPrefix = 'lookup';

  return apiFetch(options, urlPrefix, urlSuffix);
};

export const topPodcastsApiFetch: FetchFunction = (options: RequestInit, urlSuffix: string = '') => {
  const urlPrefix = 'us/rss/toppodcasts';

  return apiFetch(options, urlPrefix, urlSuffix);
};
