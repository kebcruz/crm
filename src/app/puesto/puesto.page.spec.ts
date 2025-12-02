import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuestoPage } from './puesto.page';

describe('PuestoPage', () => {
  let component: PuestoPage;
  let fixture: ComponentFixture<PuestoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
