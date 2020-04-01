import { TestBed } from '@angular/core/testing';

import { RetortCardService } from './retort-card.service';

describe('RetortCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetortCardService = TestBed.get(RetortCardService);
    expect(service).toBeTruthy();
  });
});
