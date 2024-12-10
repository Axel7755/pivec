import { TestBed } from '@angular/core/testing';

import { GoogleDriveFileService } from './google-drive-file.service';

describe('GoogleDriveFileService', () => {
  let service: GoogleDriveFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleDriveFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
