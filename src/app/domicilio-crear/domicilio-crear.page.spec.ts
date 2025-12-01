import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioCrearPage } from './domicilio-crear.page';

describe('DomicilioCrearPage', () => {
  let component: DomicilioCrearPage;
  let fixture: ComponentFixture<DomicilioCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
