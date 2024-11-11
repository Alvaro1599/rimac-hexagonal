import axios from 'axios'

import { VehicleServicePort } from '../../application/ports/vehicle-service'
import { Vehicle } from '../entities/vehicle.entity'

interface SwapiVehicle {
  name: string
  model: string
  passengers: string
  vehicle_class: string
}

export class SwapiVehicleServiceAdapter implements VehicleServicePort {
  private readonly SWAPI_BASE_URL = 'https://swapi.dev/api/'

  async getMovie(id: string): Promise<Vehicle> {
    const url = `${this.SWAPI_BASE_URL}vehicles/${id}?format=json`
    const response = await axios.get<SwapiVehicle>(url)
    return this.mapToVehicle(response.data)
  }

  private mapToVehicle(swapiVehicle: SwapiVehicle): Vehicle {
    return new Vehicle({
      model: swapiVehicle.model,
      vehicleClass: swapiVehicle.vehicle_class,
      name: swapiVehicle.name,
      passengersQuantity: parseInt(swapiVehicle.passengers)
    })
  }
}
