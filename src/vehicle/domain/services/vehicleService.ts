import { Vehicle } from '../models/vehicle'

export interface VehicleService {
  saveVehicle(card: Vehicle): Promise<Vehicle>
  getVehicleByName(name: string): Promise<Vehicle>
}
