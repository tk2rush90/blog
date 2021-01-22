import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchPageComponent } from './post-search-page.component';

describe('PostSearchPageComponent', () => {
  let component: PostSearchPageComponent;
  let fixture: ComponentFixture<PostSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
