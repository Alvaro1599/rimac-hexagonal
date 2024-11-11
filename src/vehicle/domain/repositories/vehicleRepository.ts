import { Repository } from '../../../shared/domain/repositories/repository'
import { Vehicle } from '../models/Vehicle'

export interface VehicleRepository extends Repository<Vehicle> {
  getByName(token: string): Promise<Vehicle>
}
