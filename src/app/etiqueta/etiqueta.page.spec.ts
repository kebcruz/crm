import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaPage } from './etiqueta.page';

describe('EtiquetaPage', () => {
  let component: EtiquetaPage;
  let fixture: ComponentFixture<EtiquetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
