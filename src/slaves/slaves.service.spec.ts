import { Test, TestingModule } from '@nestjs/testing';
import { SlavesService } from './slaves.service';

describe('SlavesService', () => {
  let service: SlavesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlavesService],
    }).compile();

    service = module.get<SlavesService>(SlavesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
