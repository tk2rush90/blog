import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@scripter/services/common/auth.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';

@Component({
  selector: 'app-components-post-editor',
  templateUrl: './components-post-editor.component.html',
  styleUrls: ['./components-post-editor.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class ComponentsPostEditorComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeUser();
  }

  private _subscribeUser(): void {
    const sub = this.authService
      .authResponse$
      .subscribe(res => {
        if (!res) {
          this.router.navigate(['/components/admin']);
        }
      });

    this.subscriptionService.store('_subscribeUser', sub);
  }
}
