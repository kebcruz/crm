import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomicilioDetallePage } from './domicilio-detalle.page';

describe('DomicilioDetallePage', () => {
  let component: DomicilioDetallePage;
  let fixture: ComponentFixture<DomicilioDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
