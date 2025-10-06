import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoCrearPage } from './empleado-crear.page';

describe('EmpleadoCrearPage', () => {
  let component: EmpleadoCrearPage;
  let fixture: ComponentFixture<EmpleadoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
