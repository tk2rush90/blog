import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {IntroModel} from '@scripter/models/intro-model';

@Component({
  selector: 'app-intro-list-item',
  templateUrl: './intro-list-item.component.html',
  styleUrls: ['./intro-list-item.component.scss']
})
export class IntroListItemComponent implements OnInit {
  /**
   * set intro model
   * @param intro intro model
   */
  @Input() set intro(intro: IntroModel | undefined) {
    this._intro = intro;
    this._setBackgroundUrl();
  }
  // background image url
  @HostBinding('style.background-image') backgroundImageUrl: string | undefined;
  // intro model
  private _intro: IntroModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return the intro model
   */
  get intro(): IntroModel | undefined {
    return this._intro;
  }

  /**
   * set background url from intro model
   */
  private _setBackgroundUrl(): void {
    if (this._intro?.thumbnail) {
      this.backgroundImageUrl = `url(${this._intro.thumbnail})`;
    }
  }
}
