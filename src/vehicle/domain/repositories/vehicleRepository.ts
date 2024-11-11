import { Repository } from '../../../shared/domain/repositories/repository'
import { Vehicle } from '../models/vehicle'

export interface VehicleRepository extends Repository<Vehicle> {
  getById(id: string): Promise<Vehicle>
}
