import { Test, TestingModule } from '@nestjs/testing';
import { BlackMarketService } from './black-market.service';

describe('BlackMarketService', () => {
  let service: BlackMarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlackMarketService],
    }).compile();

    service = module.get<BlackMarketService>(BlackMarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
