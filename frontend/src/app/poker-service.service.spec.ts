import { TestBed, inject } from '@angular/core/testing';

import { PokerServiceService } from './poker-service.service';

describe('PokerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokerServiceService]
    });
  });

  it('should be created', inject([PokerServiceService], (service: PokerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
