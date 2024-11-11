import { IsOptional, IsString } from 'class-validator'

import { Vehicle } from '../../domain/models/Vehicle'

export class GetVehicleInput implements Partial<Vehicle> {
  @IsOptional()
  @IsString()
  name: string
}
