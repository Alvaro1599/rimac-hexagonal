import { GetVehicleInput } from '../../application/dtos/get-vehicle.input'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { GetVehicleUseCase } from '../../application/use-cases/get-vehicle/get-vehicle-use.case'
import { WithInterceptor } from '../../decorators/interceptor.decorator'
import { Vehicle } from '../../domain/models/vehicle'
import { SwapiVehicleServiceAdapter } from '../../infrastructure/adapters/swapi-vehicle.adapter'
import { ErrorInterceptor } from '../interceptors/error.interceptor'
import { NoContentHttpResponse, OkHttpResponse } from '../responses/http-response'

export class GetVehicleController implements Controller<Partial<Vehicle>> {
  constructor(
    private readonly getVehicleUseCase: GetVehicleUseCase,
    private readonly swapiVehicleServiceAdapter: SwapiVehicleServiceAdapter
  ) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(
    request: IHttpRequest<undefined, undefined, GetVehicleInput>
  ): Promise<IHttpResponse<Partial<Vehicle>>> {
    const { query } = request
    let vehicle = await this.getVehicleUseCase.execute({ ...query })
    if (!vehicle) {
      vehicle = await this.swapiVehicleServiceAdapter.getMovie(query.name)
      if (!vehicle) return new NoContentHttpResponse({})
    }
    return new OkHttpResponse(vehicle)
  }
}
