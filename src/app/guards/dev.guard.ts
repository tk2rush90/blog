import { Injectable } from '@angular/core';
import {CanActivate, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

const {
  production,
} = environment;

@Injectable({
  providedIn: 'root'
})
export class DevGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  /**
   * only can activate when the application running in development mode
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (production) {
      this.router.navigate(['/']);
    }

    return !production;
  }

}
