import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

const {
  adminEmail,
} = environment;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // admin email
  email = adminEmail;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return the admin email
   */
  get href(): string {
    return `mailto:${this.email}`;
  }
}
