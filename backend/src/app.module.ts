import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CarsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}