import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * handle success
   */
  onSucceeded(): void {
    this._toMain();
  }

  /**
   * go to main page
   */
  private _toMain(): void {
    this.ngZone.run(() => {
      this.router.navigate(['/']);
    });
  }
}
