import { UseCase } from '../../../../shared/application/use-cases/use-case'
import { Vehicle } from '../../../domain/models/vehicle'
import { VehicleRepository } from '../../../domain/repositories/vehicleRepository'
import { GetVehicleInput } from '../../dtos/get-vehicle.input'
import { BaseValidator } from '../../validators/abstract/base.validator'

export class GetVehicleUseCase implements UseCase<GetVehicleInput, Vehicle> {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly validator: BaseValidator
  ) {}

  async execute(input: GetVehicleInput): Promise<Vehicle> {
    this.validator.validateAndThrow(GetVehicleInput, input)
    return await this.vehicleRepository.getById(input.name)
  }
}
