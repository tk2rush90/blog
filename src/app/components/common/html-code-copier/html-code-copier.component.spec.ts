import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlCodeCopierComponent } from './html-code-copier.component';

describe('HtmlCodeCopierComponent', () => {
  let component: HtmlCodeCopierComponent;
  let fixture: ComponentFixture<HtmlCodeCopierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlCodeCopierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlCodeCopierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
