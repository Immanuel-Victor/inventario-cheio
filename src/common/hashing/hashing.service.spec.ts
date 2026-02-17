import { Test } from '@nestjs/testing';
import { HashingService } from './hashing.service';

class mockBycryptStrategy {
  hash = jest.fn();
  compare = jest.fn();
}

describe('HashingService', () => {
  let hashingService: HashingService;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HashingService,
          useClass: mockBycryptStrategy,
        },
      ],
    }).compile();
    hashingService = testingModule.get(HashingService);
  });

  it('Should be defined', () => {
    expect(hashingService).toBeDefined();
  })
});
