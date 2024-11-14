import { CreateVehicleInput } from '../../application/dtos/create-vehicle.input'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { CreateVehicleUseCase } from '../../application/use-cases/get-vehicle/create-vehicle-use.case'
import { WithInterceptor } from '../../decorators/interceptor.decorator'
import { VehicleSpanish } from '../../domain/models/vehicle-spanish'
import { VehicleEntityMapper } from '../../infrastructure/mappers/vehicle-entity.mapper'
import { ErrorInterceptor } from '../interceptors/error.interceptor'
import { OkHttpResponse } from '../responses/http-response'

export class CreateVehicleController implements Controller<Partial<VehicleSpanish>> {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    readonly mapper: VehicleEntityMapper
  ) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateVehicleInput>): Promise<IHttpResponse<Partial<VehicleSpanish>>> {
    const { body } = request
    const { id, passengersQuantity, vehicleClass, name, model } = await this.createVehicleUseCase.execute(body)
    const vehicleSpanish = this.mapper.toSpanishModel({ id, passengersQuantity, vehicleClass, name, model })
    return new OkHttpResponse(vehicleSpanish)
  }
}
