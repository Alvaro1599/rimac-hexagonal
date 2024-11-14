import { GetVehicleInput } from '../../application/dtos/get-vehicle.input'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { GetVehicleUseCase } from '../../application/use-cases/get-vehicle/get-vehicle-use.case'
import { WithInterceptor } from '../../decorators/interceptor.decorator'
import { VehicleSpanish } from '../../domain/models/vehicle-spanish'
import { SwapiVehicleServiceAdapter } from '../../infrastructure/adapters/swapi-vehicle.adapter'
import { VehicleEntityMapper } from '../../infrastructure/mappers/vehicle-entity.mapper'
import { ErrorInterceptor } from '../interceptors/error.interceptor'
import { NoContentHttpResponse, OkHttpResponse } from '../responses/http-response'

export class GetVehicleController implements Controller<Partial<VehicleSpanish>> {
  constructor(
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly swapiVehicleServiceAdapter: SwapiVehicleServiceAdapter,
    readonly mapper: VehicleEntityMapper
  ) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(
    request: IHttpRequest<undefined, GetVehicleInput, GetVehicleInput>
  ): Promise<IHttpResponse<Partial<VehicleSpanish>>> {
    const { params } = request
    let vehicle = await this.getVehicleUseCase.execute({ ...params })
    if (!vehicle) {
      vehicle = await this.swapiVehicleServiceAdapter.getVehicle(params.id)
      if (!vehicle) return new NoContentHttpResponse({})
    }
    const vehicleFormated = this.mapper.toSpanishModel(vehicle)
    return new OkHttpResponse(vehicleFormated)
  }
}
