import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteEtiquetaDetallePage } from './cliente-etiqueta-detalle.page';

describe('ClienteEtiquetaDetallePage', () => {
  let component: ClienteEtiquetaDetallePage;
  let fixture: ComponentFixture<ClienteEtiquetaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteEtiquetaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
