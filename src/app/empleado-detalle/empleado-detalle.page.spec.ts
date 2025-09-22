import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoDetallePage } from './empleado-detalle.page';

describe('EmpleadoDetallePage', () => {
  let component: EmpleadoDetallePage;
  let fixture: ComponentFixture<EmpleadoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
