import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaCrearPage } from './etiqueta-crear.page';

describe('EtiquetaCrearPage', () => {
  let component: EtiquetaCrearPage;
  let fixture: ComponentFixture<EtiquetaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
