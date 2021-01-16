import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListPageComponent } from './post-list-page.component';

describe('PostComponent', () => {
  let component: PostListPageComponent;
  let fixture: ComponentFixture<PostListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
