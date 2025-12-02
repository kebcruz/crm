import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaDetallePage } from './etiqueta-detalle.page';

describe('EtiquetaDetallePage', () => {
  let component: EtiquetaDetallePage;
  let fixture: ComponentFixture<EtiquetaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
