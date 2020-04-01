import { TestBed } from '@angular/core/testing';

import { ActivitiesService } from './share-idea.service';

describe('ActivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivitiesService = TestBed.get(ActivitiesService);
    expect(service).toBeTruthy();
  });
});
