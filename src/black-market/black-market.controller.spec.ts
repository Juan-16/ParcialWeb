import { Test, TestingModule } from '@nestjs/testing';
import { BlackMarketController } from './black-market.controller';
import { BlackMarketService } from './black-market.service';

describe('BlackMarketController', () => {
  let controller: BlackMarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlackMarketController],
      providers: [BlackMarketService],
    }).compile();

    controller = module.get<BlackMarketController>(BlackMarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
