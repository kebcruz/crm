import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorDetallePage } from './color-detalle.page';

describe('ColorDetallePage', () => {
  let component: ColorDetallePage;
  let fixture: ComponentFixture<ColorDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
