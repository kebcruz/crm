import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorDetallePage } from './proveedor-detalle.page';

describe('ProveedorDetallePage', () => {
  let component: ProveedorDetallePage;
  let fixture: ComponentFixture<ProveedorDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
