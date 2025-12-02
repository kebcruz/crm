import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuestoDetallePage } from './puesto-detalle.page';

describe('PuestoDetallePage', () => {
  let component: PuestoDetallePage;
  let fixture: ComponentFixture<PuestoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
