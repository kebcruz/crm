import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivoCrearPage } from './archivo-crear.page';

describe('ArchivoCrearPage', () => {
  let component: ArchivoCrearPage;
  let fixture: ComponentFixture<ArchivoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
