import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuestoCrearPage } from './puesto-crear.page';

describe('PuestoCrearPage', () => {
  let component: PuestoCrearPage;
  let fixture: ComponentFixture<PuestoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
