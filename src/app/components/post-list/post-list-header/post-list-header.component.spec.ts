import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListHeaderComponent } from './post-list-header.component';

describe('PostListCategoryComponent', () => {
  let component: PostListHeaderComponent;
  let fixture: ComponentFixture<PostListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
