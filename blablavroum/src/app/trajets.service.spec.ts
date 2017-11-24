import { TestBed, inject } from '@angular/core/testing';

import { TrajetsService } from './trajets.service';

describe('TrajetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrajetsService]
    });
  });

  it('should be created', inject([TrajetsService], (service: TrajetsService) => {
    expect(service).toBeTruthy();
  }));
});
