import { IAllowOriginsResponseJson } from "../services/apiServices";

// Notes: Only 200 is considered as OK status because its the real case in this application.
export const checkHttpCode = (allowOriginsReponse: IAllowOriginsResponseJson) => {
  const { contents, status } = allowOriginsReponse;

  const httpCode = status['http_code'];
  if (httpCode !== 200) throw new Error(`${httpCode}: ${contents}`);
};
