import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '@scripter/models/post-model';
import {environment} from '../../../../../environments/environment';

const {
  displayableLabels,
} = environment;

@Component({
  selector: 'app-post-list-label-container',
  templateUrl: './post-list-label-container.component.html',
  styleUrls: ['./post-list-label-container.component.scss']
})
export class PostListLabelContainerComponent implements OnInit {
  /**
   * set post model
   * @param post post model
   */
  @Input() set post(post: PostModel | undefined) {
    this._post = post;
    this._setDisplayableLabels();
  }
  // displayable labels
  labels: string[] = [];
  // remaining number of labels
  remainingLabels = 0;
  // post model
  private _post: PostModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * set displayable labels
   */
  private _setDisplayableLabels(): void {
    if (this._post) {
      this.labels = [...this._post.labels].splice(0, displayableLabels);
      this.remainingLabels = this._post.labels.length - displayableLabels;
    }
  }
}
