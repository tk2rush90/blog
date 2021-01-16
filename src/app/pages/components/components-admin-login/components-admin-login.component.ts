import {Component, NgZone, OnInit} from '@angular/core';
import {GoogleUser} from '@scripter/models/google-models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-components-admin-login',
  templateUrl: './components-admin-login.component.html',
  styleUrls: ['./components-admin-login.component.scss'],
})
export class ComponentsAdminLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
  }

  onSignedIn(user: GoogleUser): void {
    console.log(user.getAuthResponse());

    this.ngZone.run(() => {
      this.router.navigate(['/components/post-editor']);
    });
  }
}
