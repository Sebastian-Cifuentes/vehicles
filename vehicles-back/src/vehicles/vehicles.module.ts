import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { AuthModule } from '../auth/auth.module';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    AuthModule
  ],
  exports: [ VehiclesService, TypeOrmModule ]
})
export class VehiclesModule {}
