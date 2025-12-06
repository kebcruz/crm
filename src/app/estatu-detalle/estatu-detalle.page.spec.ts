import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstatuDetallePage } from './estatu-detalle.page';

describe('EstatuDetallePage', () => {
  let component: EstatuDetallePage;
  let fixture: ComponentFixture<EstatuDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatuDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
