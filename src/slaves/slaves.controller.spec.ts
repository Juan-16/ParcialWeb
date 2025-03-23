import { Test, TestingModule } from '@nestjs/testing';
import { SlavesController } from './slaves.controller';
import { SlavesService } from './slaves.service';

describe('SlavesController', () => {
  let controller: SlavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlavesController],
      providers: [SlavesService],
    }).compile();

    controller = module.get<SlavesController>(SlavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
