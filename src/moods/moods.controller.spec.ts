import { Test, TestingModule } from '@nestjs/testing';
import { MoodsController } from './moods.controller';
import { MoodsService } from './moods.service';

describe('MoodsController', () => {
  let controller: MoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodsController],
      providers: [MoodsService],
    }).compile();

    controller = module.get<MoodsController>(MoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
