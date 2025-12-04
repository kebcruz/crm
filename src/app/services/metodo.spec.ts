import { TestBed } from '@angular/core/testing';

import { Metodo } from './metodo';

describe('Metodo', () => {
  let service: Metodo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Metodo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
