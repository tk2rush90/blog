import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-intro-winter-page',
  templateUrl: './intro-2020-winter-page.component.html',
  styleUrls: ['./intro-2020-winter-page.component.scss']
})
export class Intro2020WinterPageComponent implements OnInit {

  constructor(
    private title: Title,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Scripter Log - 2020 Winter Intro');
  }

}
