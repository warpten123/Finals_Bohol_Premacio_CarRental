import { Test, TestingModule } from '@nestjs/testing';
import { carController } from '../cars/car.controller';

describe('UserController', () => {
  let controller: carController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [carController],
    }).compile();

    controller = module.get<carController>(carController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
