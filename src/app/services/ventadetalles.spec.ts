import { TestBed } from '@angular/core/testing';

import { Ventadetalles } from './ventadetalles';

describe('Ventadetalles', () => {
  let service: Ventadetalles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ventadetalles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
