import { Vehicle } from './vehicle'

export class VehicleSpanish {
  readonly id: string
  readonly nombre: string
  readonly modelo: string
  readonly cantidadDePasajeros: number
  readonly clase: string
  constructor({ id, name, model, passengersQuantity, vehicleClass }: Partial<Vehicle>) {
    this.id = id ?? crypto.randomUUID()
    this.nombre = name
    this.modelo = model
    this.cantidadDePasajeros = passengersQuantity
    this.clase = vehicleClass
  }
}
