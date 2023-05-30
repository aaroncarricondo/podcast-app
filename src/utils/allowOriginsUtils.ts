export interface IAllowOriginsResponse<T = any> {
  contents: T;
  status: {
    url: string;
    'http_code': string;
    'content_type': string;
    'response_time': string;
    'content_length': string;
  }
}

// Notes: Only 200 is considered as OK status because its the real case in this application.
export const checkHttpCode = (allowOriginsReponse: IAllowOriginsResponse) => {
  const { contents, status } = allowOriginsReponse;

  const httpCode = status['http_code'];
  if (httpCode !== '200') throw new Error(`${httpCode}: ${contents}`);
};
