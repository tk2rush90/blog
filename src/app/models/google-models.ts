export interface ValidTokenResponse {
  audience: string;
  user_id: string;
  scope: string;
  expires_in: number;
}

export interface InvalidTokenResponse {
  error: string;
}

export interface IsSignedIn {
  /**
   * Returns whether the current user is currently signed in.
   */
  get(): boolean;

  /**
   * Listen for changes in the current user's sign-in state.
   */
  listen(listener: (signedIn: boolean) => any): void;
}

export interface CurrentUser {
  /**
   * Returns a GoogleUser object that represents the current user. Note that in a newly-initialized
   * GoogleAuth instance, the current user has not been set. Use the currentUser.listen() method or the
   * GoogleAuth.then() to get an initialized GoogleAuth instance.
   */
  get(): GoogleUser;

  /**
   * Listen for changes in currentUser.
   */
  listen(listener: (user: GoogleUser) => any): void;
}

export interface GoogleUser {
  /**
   * Get the user's unique ID string.
   */
  getId(): string;

  /**
   * Returns true if the user is signed in.
   */
  isSignedIn(): boolean;

  /**
   * Get the user's Google Apps domain if the user signed in with a Google Apps account.
   */
  getHostedDomain(): string;

  /**
   * Get the scopes that the user granted as a space-delimited string.
   */
  getGrantedScopes(): string;

  /**
   * Get the user's basic profile information.
   */
  getBasicProfile(): BasicProfile;

  /**
   * Get the response object from the user's auth session.
   */
  getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;

  /**
   * Forces a refresh of the access token, and then returns a Promise for the new AuthResponse.
   */
  reloadAuthResponse(): Promise<AuthResponse>;

  /**
   * Returns true if the user granted the specified scopes.
   */
  hasGrantedScopes(scopes: string): boolean;

  /**
   * Signs in the user. Use this method to request additional scopes for incremental
   * authorization or to sign in a user after the user has signed out.
   * When you use GoogleUser.signIn(), the sign-in flow skips the account chooser step.
   * See GoogleAuth.signIn().
   */
  signIn(options?: SigninOptions | SigninOptionsBuilder): any;

  /**
   * See GoogleUser.signIn()
   */
  grant(options?: SigninOptions | SigninOptionsBuilder): any;

  /**
   * Get permission from the user to access the specified scopes offline.
   * When you use GoogleUser.grantOfflineAccess(), the sign-in flow skips the account chooser step.
   * See GoogleUser.grantOfflineAccess().
   */
  grantOfflineAccess(scopes: string): void;

  /**
   * Revokes all of the scopes that the user granted.
   */
  disconnect(): void;
}

export interface BasicProfile {
  getId(): string;

  getName(): string;

  getGivenName(): string;

  getFamilyName(): string;

  getImageUrl(): string;

  getEmail(): string;
}

export interface AuthResponse {
  access_token: string;
  id_token: string;
  login_hint: string;
  scope: string;
  expires_in: number;
  first_issued_at: number;
  expires_at: number;
  token_type: string;
  idpId: string;
  session_state: {
    extraQueryParams: {
      authuser: string;
    };
  };
}

export interface SigninOptions {
  /**
   * The package name of the Android app to install over the air.
   * See Android app installs from your web site:
   * https://developers.google.com/identity/sign-in/web/android-app-installs
   */
  app_package_name?: string;
  /**
   *  Fetch users' basic profile information when they sign in.
   *  Adds 'profile', 'email' and 'openid' to the requested scopes.
   *  True if unspecified.
   */
  fetch_basic_profile?: boolean;
  /**
   * Specifies whether to prompt the user for re-authentication.
   * See OpenID Connect Request Parameters:
   * https://openid.net/specs/openid-connect-basic-1_0.html#RequestParameters
   */
  prompt?: string;
  /**
   * The scopes to request, as a space-delimited string.
   * Optional if fetch_basic_profile is not set to false.
   */
  scope?: string;
  /**
   * The UX mode to use for the sign-in flow.
   * By default, it will open the consent flow in a popup.
   */
  ux_mode?: 'popup' | 'redirect';
  /**
   * If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow.
   * The default redirect_uri is the current URL stripped of query parameters and hash fragment.
   */
  redirect_uri?: string;
  /**
   * When your app knows which user it is trying to authenticate, it can provide this parameter as a hint to the authentication server.
   * Passing this hint suppresses the account chooser and either pre-fill the email box on the sign-in form, or select the proper session (if the user is using multiple sign-in),
   * which can help you avoid problems that occur if your app logs in the wrong user account. The value can be either an email address or the sub string,
   * which is equivalent to the user's Google ID.
   * https://developers.google.com/identity/protocols/OpenIDConnect?hl=en#authenticationuriparameters
   */
  login_hint?: string;
}

export interface SigninOptionsBuilder {
  setAppPackageName(name: string): any;

  setFetchBasicProfile(fetch: boolean): any;

  setPrompt(prompt: string): any;

  setScope(scope: string): any;

  setLoginHint(hint: string): any;
}

export interface OfflineAccessOptions {
  scope?: string;
  prompt?: 'select_account' | 'consent';
  app_package_name?: string;
}

export interface GoogleAuth {
  isSignedIn: IsSignedIn;
  currentUser: CurrentUser;

  /**
   * Calls the onInit function when the GoogleAuth object is fully initialized, or calls the onFailure function if
   * initialization fails.
   */
  then(onInit: (googleAuth: GoogleAuth) => any, onFailure?: (reason: { error: string, details: string }) => any): any;

  /**
   * Signs in the user using the specified options.
   * If no option specified here, fallback to the options specified to gapi.auth2.init().
   */
  signIn(options?: SigninOptions | SigninOptionsBuilder): Promise<GoogleUser>;

  /**
   * Signs out all accounts from the application.
   */
  signOut(): any;

  /**
   * Revokes all of the scopes that the user granted.
   */
  disconnect(): any;

  /**
   * Get permission from the user to access the specified scopes offline.
   */
  grantOfflineAccess(options?: OfflineAccessOptions): Promise<{ code: string }>;

  /**
   * Attaches the sign-in flow to the specified container's click handler.
   */
  attachClickHandler(container: any, options: SigninOptions,
                     onsuccess: (googleUser: GoogleUser) => any, onfailure: (reason: string) => any): any;
}
