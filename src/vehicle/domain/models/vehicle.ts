export class Vehicle {
  readonly id: string
  readonly name: string
  readonly model: string
  readonly passengersQuantity: number
  readonly vehicleClass: string
  constructor({ id, name, model, passengersQuantity, vehicleClass }: Partial<Vehicle>) {
    this.id = id
    this.name = name
    this.model = model
    this.passengersQuantity = passengersQuantity
    this.vehicleClass = vehicleClass
  }
}
