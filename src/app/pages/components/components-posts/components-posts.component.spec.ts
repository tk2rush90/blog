import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPostsComponent } from './components-posts.component';

describe('ComponentsPostsComponent', () => {
  let component: ComponentsPostsComponent;
  let fixture: ComponentFixture<ComponentsPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
