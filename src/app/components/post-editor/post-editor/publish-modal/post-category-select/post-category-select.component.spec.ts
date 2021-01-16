import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCategorySelectComponent } from './post-category-select.component';

describe('PostCategorySelectComponent', () => {
  let component: PostCategorySelectComponent;
  let fixture: ComponentFixture<PostCategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCategorySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
