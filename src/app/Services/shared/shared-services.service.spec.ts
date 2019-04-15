import { TestBed } from '@angular/core/testing';

import { ProgressBar } from './progressBar.service';

describe('SharedServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressBar = TestBed.get(ProgressBar);
    expect(service).toBeTruthy();
  });
});


