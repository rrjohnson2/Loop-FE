import { TestBed } from '@angular/core/testing';

import { ContentService } from './layout.service';

describe('ContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentService = TestBed.get(ContentService);
    expect(service).toBeTruthy();
  });
});
