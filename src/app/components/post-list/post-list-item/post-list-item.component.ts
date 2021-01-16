import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '@scripter/models/post-model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  /**
   * set post model
   * @param post post model
   */
  @Input() set post(post: PostModel | undefined) {
    this._post = post;
    this._setIntroContent();
  }
  // post base url
  @Input() baseUrl = '';
  // content intro
  intro = '';
  // post model
  private _post: PostModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return the post model
   */
  get post(): PostModel | undefined {
    return this._post;
  }

  /**
   * set the first paragraph as intro
   */
  private _setIntroContent(): void {
    if (this._post) {
      const contents = this._post.content.split('\n');

      this.intro = contents[0] || '';
    }
  }
}
