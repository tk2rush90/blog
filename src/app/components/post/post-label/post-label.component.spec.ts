import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLabelComponent } from './post-label.component';

describe('PostLabelComponent', () => {
  let component: PostLabelComponent;
  let fixture: ComponentFixture<PostLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
