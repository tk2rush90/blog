import {Component, HostListener, OnInit} from '@angular/core';
import {PostEditorService} from '@scripter/services/component/post-editor.service';
import {SubscriptionService} from '@scripter/services/subscription/subscription.service';
import {BOTH, LEFT, RIGHT, ViewToggleType} from '@scripter/components/common/view-toggle-icon/view-toggle-icon.component';
import {environment} from '../../../../environments/environment';

const {
  tabletBreakingWidth,
} = environment;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class PostEditorComponent implements OnInit {
  // view type
  view: ViewToggleType = BOTH;
  // tablet width
  private readonly _tabletWidth = tabletBreakingWidth;

  constructor(
    private postEditorService: PostEditorService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeView();
    this._toggleViewTypeByWidth();
  }

  /**
   * return `true` when view type is 'both'
   */
  get showBoth(): boolean {
    return this.view === BOTH;
  }

  /**
   * return `true` when view type is 'both' or 'left'
   */
  get showTextarea(): boolean {
    return this.showBoth || this.view === LEFT;
  }

  /**
   * return `true` when view type is 'both' or 'right'
   */
  get showPreviewer(): boolean {
    return this.showBoth || this.view === RIGHT;
  }

  /**
   * subscribe view value
   */
  private _subscribeView(): void {
    const sub = this.postEditorService
      .view$
      .subscribe(res => {
        this.view = res;
      });

    this.subscriptionService.store('_subscribeView', sub);
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowBeforeUnloaded(event: Event): void {
    event.preventDefault();
    event.returnValue = true;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this._toggleViewTypeByWidth();
  }

  /**
   * toggle the view type by window width
   */
  private _toggleViewTypeByWidth(): void {
    if (this.underTablet && this.showBoth) {
      this.postEditorService.view = LEFT;
    }
  }

  /**
   * return `true` when window width is under tablet
   */
  get underTablet(): boolean {
    return window.innerWidth < this._tabletWidth;
  }
}
