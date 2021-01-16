import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * set scroll container
   * @param container container
   */
  @Input() set scrollContainer(container: ElementRef<HTMLElement> | HTMLElement) {
    // when container is changed, remove previous event handler
    if (this._scrollContainerRef !== container) {
      this._removeScrollEventFromContainer();
    }

    this._scrollContainerRef = container;
    this._setScrollContainerElement();
    this._setScrollEventToContainer();
  }
  // bind scrolled state as class
  @HostBinding('class.scripter-scrolled') scrolled = false;
  // scroll container ref
  private _scrollContainerRef: ElementRef<HTMLElement> | HTMLElement | undefined;
  // scroll container
  private _scrollContainer: HTMLElement | undefined;
  // event bound state
  private _eventBound = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setScrollEventToContainer();
    this._handleScrolled();
  }

  ngOnDestroy(): void {
    this._removeScrollEventFromContainer();
  }

  /**
   * set scroll container element
   */
  private _setScrollContainerElement(): void {
    if (this._scrollContainerRef) {
      if (this._scrollContainerRef instanceof ElementRef) {
        this._scrollContainer = this._scrollContainerRef.nativeElement;
      } else {
        this._scrollContainer = this._scrollContainerRef;
      }
    }
  }

  /**
   * set scroll event to container
   */
  private _setScrollEventToContainer(): void {
    if (this._scrollContainer && !this._eventBound) {
      this._scrollContainer.addEventListener('scroll', this._handleScrolled);
      this._eventBound = true;
    }
  }

  /**
   * handle container scrolled
   */
  private _handleScrolled = (): void => {
    if (this._scrollContainer) {
      this.scrolled = this._scrollContainer.scrollTop > 0;
    }
  }

  /**
   * remove scrolled event from the container
   */
  private _removeScrollEventFromContainer(): void{
    if (this._scrollContainer && this._eventBound) {
      this._scrollContainer.removeEventListener('scroll', this._handleScrolled);
      this._eventBound = false;
    }
  }
}
