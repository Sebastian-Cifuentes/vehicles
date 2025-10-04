import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { Auth } from 'src/auth/decorators';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @Auth()
  @ApiResponse({status: 201, description: 'Vehicle was created', type: Vehicle})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @ApiBearerAuth()
  create(
    @Body() createVehicleDto: CreateVehicleDto
  ) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiBearerAuth()
  @Auth()
  @ApiResponse({status: 201, description: 'Get all vehicles'})
  @ApiBadRequestResponse({description: 'Bad request'})
  @ApiUnauthorizedResponse({description: 'No token'})
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth()
  findOne(@Param('id' ) id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Auth()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.vehiclesService.remove(id);
  }
}
