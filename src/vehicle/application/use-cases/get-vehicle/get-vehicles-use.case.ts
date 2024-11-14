import { UseCase } from '../../../../shared/application/use-cases/use-case'
import { Vehicle } from '../../../domain/models/vehicle'
import { VehicleRepository } from '../../../domain/repositories/vehicleRepository'
import { GetVehiclesInput } from '../../dtos/get-vehicles.input'
import { BaseValidator } from '../../validators/abstract/base.validator'

export class GetVehiclesUseCase implements UseCase<GetVehiclesInput, Vehicle[]> {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly validator: BaseValidator
  ) {}

  async execute(input: GetVehiclesInput): Promise<Vehicle[]> {
    this.validator.validateAndThrow(GetVehiclesInput, input)
    return await this.vehicleRepository.getAll()
  }
}
