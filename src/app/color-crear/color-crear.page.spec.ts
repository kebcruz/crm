import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorCrearPage } from './color-crear.page';

describe('ColorCrearPage', () => {
  let component: ColorCrearPage;
  let fixture: ComponentFixture<ColorCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
