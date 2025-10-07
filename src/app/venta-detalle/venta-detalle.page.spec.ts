import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaDetallePage } from './venta-detalle.page';

describe('VentaDetallePage', () => {
  let component: VentaDetallePage;
  let fixture: ComponentFixture<VentaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
