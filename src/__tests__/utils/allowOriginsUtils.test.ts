import { IAllowOriginsResponseJson } from "../../services/apiServices";
import { checkHttpCode } from "../../utils/allowOriginsUtils";

describe('Check http code to allowOrigins service', () => {
  it('should throw an Error if status is not 200', () => {
    const allowOriginsResponse: IAllowOriginsResponseJson = {
      contents: 'Contents',
      status: {
        url: 'http://www.sampleUrl.com',
        'http_code': '500',
        'content_type': 'text/javascript; charset=utf-8',
        'response_time': '1000',
        'content_length': '7',
      },
    };

    expect(() => checkHttpCode(allowOriginsResponse)).toThrow('500: Contents');
  });
});