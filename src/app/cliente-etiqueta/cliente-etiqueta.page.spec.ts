import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteEtiquetaPage } from './cliente-etiqueta.page';

describe('ClienteEtiquetaPage', () => {
  let component: ClienteEtiquetaPage;
  let fixture: ComponentFixture<ClienteEtiquetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteEtiquetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
