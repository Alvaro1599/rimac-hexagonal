import { Vehicle } from '../../domain/models/vehicle'

export interface VehicleServicePort {
  getMovie(id: string): Promise<Vehicle>
}
