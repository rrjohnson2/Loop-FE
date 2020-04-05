import { TestBed } from '@angular/core/testing';

import { UploadImageModalService } from './upload-image-modal.service';

describe('UploadImageModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadImageModalService = TestBed.get(UploadImageModalService);
    expect(service).toBeTruthy();
  });
});
