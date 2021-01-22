import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PostModel} from '@scripter/models/post-model';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';

const {
  displayableLabels,
} = environment;

@Component({
  selector: 'app-post-list-label-container',
  templateUrl: './post-list-label-container.component.html',
  styleUrls: ['./post-list-label-container.component.scss']
})
export class PostListLabelContainerComponent implements OnInit, AfterViewInit {
  /**
   * set post model
   * @param post post model
   */
  @Input() set post(post: PostModel | undefined) {
    this._post = post;
    this._setDisplayableLabels();
    this._checkHiddenLabelsActivated();
  }

  /**
   * set searching labels
   * @param labels labels
   */
  @Input() set searchingLabels(labels: string) {
    this._searchingLabels = labels;
    this._searchingLabelsArray = this._searchingLabels.split(',').filter(item => item.trim());
    this._checkHiddenLabelsActivated();
  }
  // displayable labels
  labels: string[] = [];
  // remaining number of labels
  remainingLabels: string[] = [];
  // flag for activation of hidden labels
  hiddenActivated = false;
  // post model
  private _post: PostModel | undefined;
  // searching labels
  private _searchingLabels = '';
  // searching labels array
  private _searchingLabelsArray: string[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._checkHiddenLabelsActivated();
  }

  /**
   * return the array for searching labels
   */
  get searchingLabelsArray(): string[] {
    return this._searchingLabelsArray;
  }

  /**
   * set displayable labels
   */
  private _setDisplayableLabels(): void {
    if (this._post) {
      this.labels = [...this._post.labels].splice(0, displayableLabels);
      this.remainingLabels = [...this._post.labels].splice(displayableLabels);
    }
  }

  /**
   * show all labels when add button clicked
   */
  showAllLabels(): void {
    if (this._post) {
      this.labels = this._post.labels;
      this.remainingLabels = [];
      this.hiddenActivated = false;
    }
  }

  /**
   * check whether there are some activated hidden labels
   */
  private _checkHiddenLabelsActivated(): void {
    this.hiddenActivated = this.remainingLabels.some(item => {
      return this.isActivated(item);
    });
  }

  /**
   * return activated state
   * @param label label
   */
  isActivated(label: string): boolean {
    return this._searchingLabelsArray.indexOf(label) !== -1;
  }

  /**
   * add or remove label from the search labels
   * @param label clicked label
   */
  onClickLabel(label: string): void {
    const index = this._searchingLabelsArray.indexOf(label);

    if (index !== -1) {
      this._navigateWithRemovingLabel(label);
    } else {
      this._navigateWithAddingLabel(label);
    }
  }

  /**
   * navigate to search result page with adding clicked label
   * @param label clicked label
   */
  private _navigateWithAddingLabel(label: string): void {
    this.router.navigate(['/post/search/labels'], {
      queryParams: {
        labels: [...this._searchingLabelsArray, label].join(','),
      },
    });
  }

  /**
   * navigate to search result page with removing clicked label
   * @param label clicked label
   */
  private _navigateWithRemovingLabel(label: string): void {
    this.router.navigate(['/post/search/labels'], {
      queryParams: {
        labels: [...this._searchingLabelsArray].filter(item => item !== label).join(','),
      },
    });
  }
}
