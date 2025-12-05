import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetodoDetallePage } from './metodo-detalle.page';

describe('MetodoDetallePage', () => {
  let component: MetodoDetallePage;
  let fixture: ComponentFixture<MetodoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
