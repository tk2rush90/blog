import {AfterViewInit, ContentChildren, Directive, ElementRef, QueryList} from '@angular/core';
import {AutoScrollItemDirective} from '@scripter/components/common/auto-scroller/auto-scroll-item.directive';

@Directive({
  selector: '[appAutoScrollContainer]'
})
export class AutoScrollContainerDirective implements AfterViewInit {
  // auto scroll item list
  @ContentChildren(AutoScrollItemDirective, {descendants: true}) autoScrollItemList: QueryList<AutoScrollItemDirective> | undefined;
  // focused item
  private _focused: AutoScrollItemDirective | undefined;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngAfterViewInit(): void {
    this._findFocusedItem();
  }

  /**
   * find focused item
   */
  private _findFocusedItem(): void {
    if (this.autoScrollItemList) {
      this._focused = this.autoScrollItemList.find(item => item.focused);
      this._scrollIntoView();
    }
  }

  /**
   * scroll into view to show element
   */
  private _scrollIntoView(): void {
    const container = this.elementRef?.nativeElement;
    const element = this._focused?.elementRef?.nativeElement;

    if (element && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      container.scrollTop = (elementRect.top + (elementRect.height / 2)) - (containerRect.top + (containerRect.height / 2));
    }
  }
}
