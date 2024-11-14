import { GetVehiclesInput } from '../../application/dtos/get-vehicles.input'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { GetVehiclesUseCase } from '../../application/use-cases/get-vehicle/get-vehicles-use.case'
import { WithInterceptor } from '../../decorators/interceptor.decorator'
import { Vehicle } from '../../domain/models/vehicle'
import { SwapiVehicleServiceAdapter } from '../../infrastructure/adapters/swapi-vehicle.adapter'
import { ErrorInterceptor } from '../interceptors/error.interceptor'
import { OkHttpResponse } from '../responses/http-response'

export class GetVehiclesController implements Controller<Partial<Vehicle>[]> {
  constructor(
    private readonly getVehiclesUseCase: GetVehiclesUseCase,
    private readonly swapiVehicleServiceAdapter: SwapiVehicleServiceAdapter
  ) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(
    request: IHttpRequest<undefined, undefined, GetVehiclesInput>
  ): Promise<IHttpResponse<Partial<Vehicle>[]>> {
    const { query } = request
    const vehicles = await this.getVehiclesUseCase.execute({ ...query })
    const vehiclesFromApi = await this.swapiVehicleServiceAdapter.getAll()
    const allVehicles = [...vehicles, ...vehiclesFromApi]
    return new OkHttpResponse(allVehicles)
  }
}
