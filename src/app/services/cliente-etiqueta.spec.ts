import { TestBed } from '@angular/core/testing';

import { ClienteEtiqueta } from './cliente-etiqueta';

describe('ClienteEtiqueta', () => {
  let service: ClienteEtiqueta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteEtiqueta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
