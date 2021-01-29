import { Component, OnInit } from '@angular/core';
import {AbstractAnimationScene} from '@scripter/services/animation/animation.service';
import * as PIXI from 'pixi.js';
import {randomNumber} from '@scripter/utils/random.util';

export interface CherryBlossomTreeOptions {
  x: number;
}

export class CherryBlossomTree extends AbstractAnimationScene {
  // graphics
  graphics: PIXI.Graphics = new PIXI.Graphics();
  // branch depth
  private _depth = 5;

  constructor(options: CherryBlossomTreeOptions) {
    super();
  }

  animate(frame: number): void {
    super.animate(frame);
  }

  private _drawBranch(): void {
    const length = randomNumber(20, 40);
  }
}

@Component({
  selector: 'app-intro-2021-spring',
  templateUrl: './intro-2021-spring.component.html',
  styleUrls: ['./intro-2021-spring.component.scss']
})
export class Intro2021SpringComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
