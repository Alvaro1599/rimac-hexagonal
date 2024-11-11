import { GetVehicleInput } from '../../application/dtos/get-vehicle.input'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { GetVehicleUseCase } from '../../application/use-cases/get-vehicle/get-vehicle-use.case'
import { WithInterceptor } from '../../decorators/interceptor.decorator'
import { Vehicle } from '../../domain/models/Vehicle'
import { ErrorInterceptor } from '../interceptors/error.interceptor'
import { NoContentHttpResponse, OkHttpResponse } from '../responses/http-response'

export class GetVehicleController implements Controller<Partial<Vehicle>> {
  constructor(private readonly getVehicleUseCase: GetVehicleUseCase) {}
  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(
    request: IHttpRequest<undefined, undefined, GetVehicleInput>
  ): Promise<IHttpResponse<Partial<Vehicle>>> {
    const { query } = request
    const vehicle = await this.getVehicleUseCase.execute({ ...query })
    if (!vehicle) return new NoContentHttpResponse({})
    return new OkHttpResponse(vehicle)
  }
}
