import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivoPage } from './archivo.page';

describe('ArchivoPage', () => {
  let component: ArchivoPage;
  let fixture: ComponentFixture<ArchivoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
