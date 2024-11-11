import { IsOptional, IsString } from 'class-validator'

import { Vehicle } from '../../domain/models/vehicle'

export class GetVehicleInput implements Partial<Vehicle> {
  @IsOptional()
  @IsString()
  name: string
}
