import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorCrearPage } from './proveedor-crear.page';

describe('ProveedorCrearPage', () => {
  let component: ProveedorCrearPage;
  let fixture: ComponentFixture<ProveedorCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
