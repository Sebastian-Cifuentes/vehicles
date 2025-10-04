import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {

  private readonly logger = new Logger('VehiclesService');

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly dataSource: DataSource
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {


      const vehicle = this.vehicleRepository.create(createVehicleDto);
      await this.vehicleRepository.save(vehicle);

      return {...vehicle};

    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findAll() {
    const vehicles = await this.vehicleRepository.find();
    return {vehicles};
  }

  async findOne(id: string) {
    
    const vehicle: Vehicle | null = await this.vehicleRepository.findOneBy({id});

    if (!vehicle) throw new NotFoundException(`Vehicle with id: ${id} not found`);

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const { ...toUpdate } = updateVehicleDto;

    const vehicle = await this.vehicleRepository.preload({
      id,
      ...toUpdate
    });

    if ( !vehicle ) throw new NotFoundException(`Vehicle with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(vehicle);
      await queryRunner.commitTransaction();
      await queryRunner.release();  
      return this.findOne(id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptionError(err);
    }

  }

  async remove(id: string) {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
    return {message: 'Vehicle has been removed'};
  }

  private handleDBExceptionError(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
