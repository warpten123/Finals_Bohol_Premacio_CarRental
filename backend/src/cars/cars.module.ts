import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { carController } from '../cars/car.controller';

@Module({
  controllers: [carController],
  providers: [CarsService]
})
export class CarsModule {}
