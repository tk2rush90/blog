import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {GoogleUser} from '@scripter/models/google-models';
import {AuthService} from '@scripter/services/common/auth.service';
import {StorageService} from '@scripter/services/common/storage.service';

@Component({
  selector: 'app-auto-admin-login',
  templateUrl: './auto-admin-login.component.html',
  styleUrls: ['./auto-admin-login.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AutoAdminLoginComponent implements OnInit {
  // emit after login succeeded
  @Output() autoLoginSucceeded: EventEmitter<GoogleUser> = new EventEmitter();
  // emit after login failed
  @Output() autoLoginFailed: EventEmitter<void> = new EventEmitter<void>();
  // google user
  private _googleUser: GoogleUser | undefined;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeSigningFailed();
    this._subscribeSigningSucceeded();
    this._signIn();
  }

  /**
   * subscribe signing failed
   */
  private _subscribeSigningFailed(): void {
    const sub = this.authService.signingFailed
      .subscribe(() => {
        this._onSigningFailed();
      });

    this.subscriptionService.store('_subscribeSigningFailed', sub);
  }

  /**
   * subscribe signing succeeded
   */
  private _subscribeSigningSucceeded(): void {
    const sub = this.authService.signingSucceeded
      .subscribe((res: GoogleUser) => {
        this._googleUser = res;
        this._onSigningSucceeded();
      });

    this.subscriptionService.store('_subscribeSigningSucceeded', sub);
  }

  /**
   * sign in
   */
  private _signIn(): void {
    this.authService.signIn();
  }

  /**
   * signing failed handler
   */
  private _onSigningFailed(): void {
    this.autoLoginFailed.emit();
  }

  /**
   * signing succeeded handler
   */
  private _onSigningSucceeded(): void {
    if (this._googleUser) {
      this.autoLoginSucceeded.emit(this._googleUser);
    }
  }
}
