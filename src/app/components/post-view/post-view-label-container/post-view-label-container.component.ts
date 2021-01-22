import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-view-label-container',
  templateUrl: './post-view-label-container.component.html',
  styleUrls: ['./post-view-label-container.component.scss']
})
export class PostViewLabelContainerComponent implements OnInit {
  // post labels
  @Input() labels: string[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigate to search page with label
   * @param label clicked label
   */
  onClickLabel(label: string): void {
    this.router.navigate(['/post/search/labels'], {
      queryParams: {
        labels: label,
      },
    });
  }
}
