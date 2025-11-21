import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivoDetallePage } from './archivo-detalle.page';

describe('ArchivoDetallePage', () => {
  let component: ArchivoDetallePage;
  let fixture: ComponentFixture<ArchivoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
