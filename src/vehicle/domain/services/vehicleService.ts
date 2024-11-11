import { Vehicle } from '../models/Vehicle'

export interface VehicleService {
  saveVehicle(card: Vehicle): Promise<Vehicle>
  getVehicleByName(name: string): Promise<Vehicle>
}
