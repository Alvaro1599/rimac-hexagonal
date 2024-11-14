import { IsOptional, IsString } from 'class-validator'

import { Vehicle } from '../../domain/models/vehicle'

export class GetVehiclesInput implements Partial<Vehicle> {
  @IsOptional()
  @IsString()
  id: string
}
