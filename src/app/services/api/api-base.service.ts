import {environment} from '../../../environments/environment';
import {isDefined} from '@scripter/utils/validation.util';
import {AuthResponse} from '@scripter/models/google-models';

const {
  apiHost,
} = environment;

export interface UnrefinedParams {
  [key: string]: any;
}

export class ApiBaseService {
  // api host
  private readonly _host = apiHost;

  constructor(path = '') {
    this._host += path;
  }

  /**
   * return the api endpoint
   * @param path path string
   */
  protected endpoint(path = ''): string {
    return this._host + path;
  }

  /**
   * create http params from object type params
   * @param params params
   */
  protected _getHttpParams(params: UnrefinedParams): { [k: string]: string } {
    const refined: { [k: string]: string } = {};

    Object.keys(params || {}).forEach(key => {
      if (isDefined(params[key])) {
        refined[key] = params[key] + '';
      }
    });

    return refined;
  }

  /**
   * create auth header with auth response
   * @param authResponse auth response
   */
  protected _createAuthHeader(authResponse?: AuthResponse): any {
    let headers;

    // set authorization headers
    if (authResponse) {
      headers = {
        Authorization: `${authResponse.token_type} ${authResponse.access_token}`,
      };
    }

    return headers;
  }
}
