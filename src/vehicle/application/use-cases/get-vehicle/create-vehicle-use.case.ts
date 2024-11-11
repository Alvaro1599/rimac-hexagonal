import { UseCase } from '../../../../shared/application/use-cases/use-case'
import { Vehicle } from '../../../domain/models/vehicle'
import { VehicleRepository } from '../../../domain/repositories/vehicleRepository'
import { CreateVehicleInput } from '../../dtos/create-vehicle.input'
import { BaseValidator } from '../../validators/abstract/base.validator'

export class CreateVehicleUseCase implements UseCase<CreateVehicleInput, Vehicle> {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly validator: BaseValidator
  ) {}

  async execute(input: CreateVehicleInput): Promise<Vehicle> {
    this.validator.validateAndThrow(CreateVehicleInput, input)
    const vehicle = new Vehicle({
      model: input.model,
      name: input.name,
      passengersQuantity: input.passengersQuantity,
      vehicleClass: input.vehicleClass
    })
    return await this.vehicleRepository.save(vehicle)
  }
}
