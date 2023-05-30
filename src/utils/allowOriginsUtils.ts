interface IAllowOriginsReponse<T = any> {
  contents: T;
  status: {
    url: string;
    'http_code': string;
    'content_type': string;
    'response_time': string;
    'content_length': string;
  }
}

export const checkHttpCode = (allowOriginsReponse: IAllowOriginsReponse) => {
  const { contents, status } = allowOriginsReponse;

  const httpCode = status['http_code'];
  if (httpCode !== '200') throw new Error(`${httpCode}: ${contents}`);
};
