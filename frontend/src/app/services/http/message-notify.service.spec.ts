import { TestBed } from '@angular/core/testing';

import { MessageNotifyService } from './message-notify.service';

describe('MessageNotifyService', () => {
  let service: MessageNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
