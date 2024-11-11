import { Repository } from '../../../shared/domain/repositories/repository'
import { Vehicle } from '../models/vehicle'

export interface VehicleRepository extends Repository<Vehicle> {
  getByName(token: string): Promise<Vehicle>
}
