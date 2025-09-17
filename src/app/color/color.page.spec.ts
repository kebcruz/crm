import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPage } from './color.page';

describe('ColorPage', () => {
  let component: ColorPage;
  let fixture: ComponentFixture<ColorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
