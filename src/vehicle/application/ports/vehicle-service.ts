import { Vehicle } from '../../domain/models/vehicle'

export interface VehicleServicePort {
  getVehicle(id: string): Promise<Vehicle>
}
