import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class CreateVehicleDto {
  
  @ApiProperty({
    description: 'Nombre del propietario',
    nullable: false,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  name_owner: string;

  @ApiProperty({
    description: 'Correo electrónico del propietario',
    nullable: false,
  })
  @IsEmail()
  email_owner: string;

  @ApiProperty({
    description: 'Número del propietario',
    nullable: false,
  })
  @IsNumber()
  number_owner: number; 

  @ApiProperty({
    description: 'Placa del vehículo',
    nullable: false,
  })
  @IsString()
  plate: string;

  @ApiProperty({
    description: 'Tipo de vehículo',
    nullable: true,
  })
  @IsString()
  type?: string;

  @ApiProperty({
    description: 'Modelo del vehículo',
    nullable: false,
  })
  @IsNumber()
  model: number;

  @ApiProperty({
    description: 'Marca del vehículo',
    nullable: false,
  })
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'Fecha de ingreso',
    nullable: false,
    example: '2025-01-01'
  })
  @IsDate()
  @Type(() => Date)
  entry_date: Date;
}
