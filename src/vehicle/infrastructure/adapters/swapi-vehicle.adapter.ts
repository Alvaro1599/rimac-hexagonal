import axios from 'axios'

import { VehicleServicePort } from '../../application/ports/vehicle-service'
import { Vehicle } from '../../domain/models/vehicle'

interface SwapiVehicle {
  name: string
  model: string
  passengers: string
  vehicle_class: string
  url: string
}

export class SwapiVehicleServiceAdapter implements VehicleServicePort {
  private readonly SWAPI_BASE_URL = 'https://swapi.dev/api/'

  async getMovie(id: string): Promise<Vehicle> {
    const url = `${this.SWAPI_BASE_URL}vehicles/${id}?format=json`
    try {
      const response = await axios.get<SwapiVehicle>(url)
      return this.mapToVehicle({
        id,
        name: response.data.name,
        model: response.data.model,
        passengersQuantity: parseInt(response.data.passengers),
        vehicleClass: response.data.vehicle_class
      })
    } catch (e) {
      return undefined
    }
  }

  private getIdFromVehicleUrl(url: string): string {
    const urlParts = url.split('/')
    return urlParts[urlParts.length - 2]
  }

  private mapToVehicle(swapiVehicle: Vehicle): Vehicle {
    return new Vehicle({
      id: swapiVehicle.id,
      model: swapiVehicle.model,
      vehicleClass: swapiVehicle.vehicleClass,
      name: swapiVehicle.name,
      passengersQuantity: swapiVehicle.passengersQuantity
    })
  }

  private async getVehicleRecursively(url: string, vehicles: Vehicle[] = []): Promise<Vehicle[]> {
    const response = await axios.get<{ next: string; results: SwapiVehicle[] }>(url)
    console.log(response.data.next, 'response')
    const allVehicles = [...vehicles, ...response.data.results]
    const newVehicles = allVehicles.map((vehicle) => {
      if (!(vehicle instanceof Vehicle)) {
        return this.mapToVehicle({
          id: this.getIdFromVehicleUrl(vehicle.url),
          name: vehicle.name,
          model: vehicle.model,
          passengersQuantity: parseInt(vehicle.passengers),
          vehicleClass: vehicle.vehicle_class
        })
      }
      return vehicle
    })

    if (response.data.next) {
      return this.getVehicleRecursively(response.data.next, newVehicles)
    }
    return newVehicles
  }

  async getAll(): Promise<Vehicle[]> {
    const url = `${this.SWAPI_BASE_URL}vehicles?format=json`
    try {
      const data = await this.getVehicleRecursively(url)
      console.log(data.length, 'data.length')
      return data
    } catch (e) {
      return []
    }
  }
}
