import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

@Entity({name: 'vehicles'})
export class Vehicle {

    @ApiProperty({
        example: '14d85da8-f823-42fc-9bab-8286011348e4',
        description: 'Vehicle id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Sebastian Cifuentes',
        description: 'Nombre del propietario',
    })
    @Column('text')
    name_owner: string;

    @ApiProperty({
        example: 'sebas@email.com',
        description: 'Email del propietario',
    })
    @IsEmail()
    @Column('text')
    email_owner: string;

    @ApiProperty({
        example: '123456',
        description: 'Número del propietario',
        default: null
    })
    @Column({
        type: 'bigint',
        nullable: true
    })
    number_owner: number;

    @ApiProperty({
        example: 'YYY555',
        description: 'Placa',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    plate: string;

    @ApiProperty({
        example: 'Camioneta',
        description: 'Tipo de vehículo',
        default: null
    })
    @Column('text')
    type: string;

    @ApiProperty({
        example: '2025',
        description: 'Modelo',
        default: null
    })
    @Column('bigint')
    model: number;

    @ApiProperty({
        example: 'Suzuki',
        description: 'Marca',
        default: null
    })
    @Column('text')
    brand: string;

    @ApiProperty({
        example: '2025-01-01',
        description: 'Fecha de ingreso del vehículo',
    })
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    entry_date: Date;

    @ApiProperty({
        example: '2025-01-01',
        description: 'Fecha de creación del registro',
    })
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}
