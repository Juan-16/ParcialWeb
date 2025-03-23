import { Test, TestingModule } from '@nestjs/testing';
import { DictatorsController } from './dictators.controller';
import { DictatorsService } from './dictators.service';

describe('DictatorsController', () => {
  let controller: DictatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictatorsController],
      providers: [DictatorsService],
    }).compile();

    controller = module.get<DictatorsController>(DictatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
