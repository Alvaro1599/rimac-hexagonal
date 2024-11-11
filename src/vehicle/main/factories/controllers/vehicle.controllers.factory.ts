import { CreateVehicleUseCase } from '../../../application/use-cases/get-vehicle/create-vehicle-use.case'
import { GetVehicleUseCase } from '../../../application/use-cases/get-vehicle/get-vehicle-use.case'
import { VehicleValidator } from '../../../application/validators/vehicle.validator'
import { CreateVehicleController } from '../../../presentation/controllers/createVehicle.controller'
import { GetVehicleController } from '../../../presentation/controllers/getVehicle.controller'
import { VehicleRepository } from '../repositories.factory'

export const createVehicleController = (): CreateVehicleController => {
  return new CreateVehicleController(new CreateVehicleUseCase(VehicleRepository(), new VehicleValidator()))
}

export const getVehicleController = (): GetVehicleController => {
  return new GetVehicleController(new GetVehicleUseCase(VehicleRepository(), new VehicleValidator()))
}