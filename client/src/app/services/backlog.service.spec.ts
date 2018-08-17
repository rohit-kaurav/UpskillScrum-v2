import { TestBed, inject } from '@angular/core/testing';

import { BacklogService } from './backlog.service';

describe('BacklogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BacklogService]
    });
  });

  it('should be created', inject([BacklogService], (service: BacklogService) => {
    expect(service).toBeTruthy();
  }));
});
