import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteEtiquetaCrearPage } from './cliente-etiqueta-crear.page';

describe('ClienteEtiquetaCrearPage', () => {
  let component: ClienteEtiquetaCrearPage;
  let fixture: ComponentFixture<ClienteEtiquetaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteEtiquetaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
