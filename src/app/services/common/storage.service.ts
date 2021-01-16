import { Injectable } from '@angular/core';
import {AuthResponse} from '@scripter/models/google-models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // auth response key
  private readonly _authResponseKey = 'SCRIPTER_AUTH_RESPONSE';

  constructor() { }

  /**
   * set response to session
   * @param response response data
   */
  set authResponse(response: AuthResponse | void) {
    localStorage.setItem(this._authResponseKey, JSON.stringify(response));
  }

  /**
   * get response from session
   */
  get authResponse(): AuthResponse | void {
    const response = localStorage.getItem(this._authResponseKey);

    if (response) {
      return JSON.parse(response);
    }
  }
}
