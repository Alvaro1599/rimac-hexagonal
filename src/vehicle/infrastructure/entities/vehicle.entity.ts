export class Vehicle {
  readonly name: string
  readonly model: string
  readonly passengersQuantity: number
  readonly vehicleClass: string
  constructor({ name, model, passengersQuantity, vehicleClass }: Partial<Vehicle>) {
    this.name = name
    this.model = model
    this.passengersQuantity = passengersQuantity
    this.vehicleClass = vehicleClass
  }
}
