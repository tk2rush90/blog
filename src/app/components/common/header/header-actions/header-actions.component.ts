import { Component, OnInit } from '@angular/core';
import {AuthService} from '@scripter/services/common/auth.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';

const {
  instagramUrl,
  githubUrl,
} = environment;

@Component({
  selector: 'app-header-actions',
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class HeaderActionsComponent implements OnInit {
  // sns and github urls
  instagramUrl = instagramUrl;
  githubUrl = githubUrl;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * return `true` when user is signed in
   */
  get signed$(): Observable<boolean> {
    return this.authService
      .authResponse$
      .pipe(map(res => {
        return !!res;
      }));
  }
}
