import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaCrearPage } from './venta-crear.page';

describe('VentaCrearPage', () => {
  let component: VentaCrearPage;
  let fixture: ComponentFixture<VentaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
