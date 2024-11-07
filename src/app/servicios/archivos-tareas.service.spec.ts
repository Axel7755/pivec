import { TestBed } from '@angular/core/testing';

import { ArchivosTareasService } from './archivos-tareas.service';

describe('ArchivosTareasService', () => {
  let service: ArchivosTareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosTareasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
