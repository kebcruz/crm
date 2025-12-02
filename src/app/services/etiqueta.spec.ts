import { TestBed } from '@angular/core/testing';

import { Etiqueta } from './etiqueta';

describe('Etiqueta', () => {
  let service: Etiqueta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Etiqueta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
