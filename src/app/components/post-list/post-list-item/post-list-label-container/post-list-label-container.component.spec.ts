import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListLabelContainerComponent } from './post-list-label-container.component';

describe('PostLabelContainerComponent', () => {
  let component: PostListLabelContainerComponent;
  let fixture: ComponentFixture<PostListLabelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListLabelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListLabelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
