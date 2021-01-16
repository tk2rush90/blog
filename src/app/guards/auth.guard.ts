import { Injectable } from '@angular/core';
import {CanActivate, UrlTree, Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {AuthService} from '@scripter/services/common/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  /**
   * only can activate the router when user is signed in
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest([
      this.authService.authenticated$,
      this.authService.authResponse$,
    ]).pipe(map(res => {
      if (res[0] && !res[1]) {
        this.router.navigate(['/']);
      }

      return !res[0] || !!(res[0] && res[1]);
    }));
  }

}
