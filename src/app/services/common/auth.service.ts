import {EventEmitter, Injectable} from '@angular/core';
import {AuthResponse, GoogleAuth, GoogleUser, ValidTokenResponse} from '@scripter/models/google-models';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GoogleAuthService} from 'ng-gapi';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {fromPromise} from 'rxjs/internal-compatibility';
import {environment} from '../../../environments/environment';
import {StorageService} from '@scripter/services/common/storage.service';

const {
  adminEmail,
} = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // emit when signing succeeded
  signingSucceeded: EventEmitter<GoogleUser> = new EventEmitter();
  // emit when signing failed
  signingFailed: EventEmitter<void> = new EventEmitter<void>();
  // user information
  private _authResponse$: BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined);
  // authenticated
  private _authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // auth instance
  private _authInstance: GoogleAuth | undefined;
  // google user
  private _googleUser: GoogleUser | undefined;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private googleAuthService: GoogleAuthService,
    private subscriptionService: SubscriptionService,
  ) { }

  /**
   * set authenticated state
   * @param state state
   */
  set authenticated(state: boolean) {
    this._authenticated$.next(state);
  }

  /**
   * return the authenticated state
   */
  get authenticated$(): Observable<boolean> {
    return this._authenticated$.asObservable();
  }

  /**
   * set authResponse data
   * @param authResponse authResponse data
   */
  set authResponse(authResponse: AuthResponse) {
    this._authResponse$.next(authResponse);
  }

  /**
   * return the user data
   */
  get authResponse$(): Observable<AuthResponse | undefined> {
    return this._authResponse$.asObservable();
  }

  /**
   * proceed sign in process
   */
  signIn(): void {
    const sub = this.googleAuthService
      .getAuth()
      .subscribe({
        next: instance => {
          this._authInstance = instance as GoogleAuth;
          this._autoLogin();
        },
        error: err => {
          console.error(err);
          this._onSigningFailed();
        },
      });

    this.subscriptionService.store('autoLogin', sub);
  }

  /**
   * auto login
   */
  private _autoLogin(): void {
    if (this._authInstance) {
      const sub = fromPromise(this._authInstance.signIn())
        .subscribe({
          next: res => {
            this._googleUser = res;
            this._checkAdminEmail();
          },
          error: err => {
            console.error(err);
            this._onSigningFailed();
          }
        });

      this.subscriptionService.store('_autoLogin', sub);
    }
  }

  /**
   * check whether user's email is admin or not
   */
  private _checkAdminEmail(): void {
    if (this._googleUser) {
      const email = this._googleUser.getBasicProfile().getEmail();

      if (email === adminEmail) {
        this._onSigningSucceeded();
      } else {
        console.error('unauthorized admin', email);
        this._onSigningFailed();
      }
    }
  }

  /**
   * save auth response to local storage and service
   */
  private _onSigningSucceeded(): void {
    if (this._googleUser) {
      const authResponse = this._googleUser.getAuthResponse(true);

      this._authResponse$.next(authResponse);
      this.storageService.authResponse = authResponse;
      this.signingSucceeded.emit(this._googleUser);
    }
  }

  /**
   * disconnect the instance
   */
  private _onSigningFailed(): void {
    if (this._authInstance) {
      // comment out the disconnect code
      // this action may not be needed
      // this._authInstance.disconnect();
      this.signingFailed.emit();
    }
  }

  /**
   * validate the token
   * @param token access token
   */
  validateToken(token: string): Observable<ValidTokenResponse> {
    return this.http.get<ValidTokenResponse>('https://www.googleapis.com/oauth2/v1/tokeninfo', {
      params: {
        access_token: token,
      }
    });
  }
}
