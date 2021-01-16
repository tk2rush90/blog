import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewLabelContainerComponent } from './post-view-label-container.component';

describe('PostViewLabelContainerComponent', () => {
  let component: PostViewLabelContainerComponent;
  let fixture: ComponentFixture<PostViewLabelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostViewLabelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewLabelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
