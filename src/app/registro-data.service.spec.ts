import { TestBed } from '@angular/core/testing';

import { RegistroDataService } from './registro-data.service';

describe('RegistroDataService', () => {
  let service: RegistroDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
