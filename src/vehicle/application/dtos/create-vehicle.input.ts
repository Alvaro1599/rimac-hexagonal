import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { Vehicle } from '../../domain/models/Vehicle'

export class CreateVehicleInput implements Vehicle {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  model: string

  @IsNotEmpty()
  @IsNumber()
  passengersQuantity: number

  @IsNotEmpty()
  @IsString()
  vehicleClass: string
}
