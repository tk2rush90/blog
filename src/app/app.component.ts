import {ApplicationRef, ChangeDetectorRef, Component, Inject, NgZone} from '@angular/core';
import {StorageService} from '@scripter/services/common/storage.service';
import {AuthService} from '@scripter/services/common/auth.service';
import {AuthResponse} from '@scripter/models/google-models';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {concat, interval, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {SwUpdate} from '@angular/service-worker';
import {DOCUMENT} from '@angular/common';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class AppComponent {
  // show update
  showUpdate = false;
  // auth response
  private _authResponse: AuthResponse | undefined | void;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private ngZone: NgZone,
    private swUpdate: SwUpdate,
    private authService: AuthService,
    private applicationRef: ApplicationRef,
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
  ) {
    this._checkUpdateInterval();
    this._checkUpdate();
    this._subscribeSigningSucceeded();
    this._subscribeSigningFailed();
    this._restoreAuthResponse();
  }

  /**
   * return the authenticated state
   */
  get authenticated$(): Observable<boolean> {
    return this.authService.authenticated$;
  }

  /**
   * restore auth response from local storage
   */
  private _restoreAuthResponse(): void {
    this._authResponse = this.storageService.authResponse;
    this._validateTheToken();
  }

  /**
   * validate the token
   */
  private _validateTheToken(): void {
    if (this._authResponse) {
      const sub = this.authService
        .validateToken(this._authResponse.access_token)
        .subscribe({
          next: () => {
            this.authService.authResponse = this._authResponse as AuthResponse;
            this._setAuthenticated();
          },
          error: () => {
            this.authService.signIn();
          }
        });

      this.subscriptionService.store('_validateTheToken', sub);
    } else {
      this._setAuthenticated();
    }
  }

  /**
   * subscribe signing succeeded
   */
  private _subscribeSigningSucceeded(): void {
    const sub = this.authService.signingSucceeded
      .subscribe(() => {
        this._setAuthenticated();
      });

    this.subscriptionService.store('_subscribeSigningSucceeded', sub);
  }

  /**
   * subscribe signing failed
   */
  private _subscribeSigningFailed(): void {
    const sub = this.authService.signingFailed
      .subscribe(() => {
        this._setAuthenticated();
      });

    this.subscriptionService.store('_subscribeSigningFailed', sub);
  }

  /**
   * set authenticated state
   * and detect changes to update UI
   */
  private _setAuthenticated(): void {
    this.ngZone.run(() => {
      this.authService.authenticated = true;
    });
  }

  /**
   * check update in interval
   */
  private _checkUpdateInterval(): void {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.applicationRef.isStable.pipe(first(isStable => isStable));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    const sub = everySixHoursOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());

    this.subscriptionService.store('_checkUpdateInterval', sub);
  }

  /**
   * check application update
   */
  private _checkUpdate(): void {
    this.swUpdate.available.subscribe(event => {
      console.log(event);
      this.showUpdate = true;
    });
  }

  /**
   * force update the application
   */
  updateApplication(): void {
    this.showUpdate = false;
    this.swUpdate.activateUpdate().then(() => this.document.location.reload());
  }
}
