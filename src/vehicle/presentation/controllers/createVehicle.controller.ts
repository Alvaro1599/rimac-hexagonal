import * as console from 'node:console'

import { CreateVehicleInput } from '../../application/dtos/create-vehicle.input'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { CreateVehicleUseCase } from '../../application/use-cases/get-vehicle/create-vehicle-use.case'
import { WithInterceptor } from '../../decorators/interceptor.decorator'
import { Vehicle } from '../../domain/models/vehicle'
import { ErrorInterceptor } from '../interceptors/error.interceptor'
import { OkHttpResponse } from '../responses/http-response'

export class CreateVehicleController implements Controller<Partial<Vehicle>> {
  constructor(private readonly createVehicleUseCase: CreateVehicleUseCase) {}
  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateVehicleInput>): Promise<IHttpResponse<Partial<Vehicle>>> {
    console.log('CreateVehicleController.handleRequest', request)
    const { body } = request
    const { passengersQuantity, vehicleClass, name, model } = await this.createVehicleUseCase.execute(body)
    return new OkHttpResponse({ passengersQuantity, vehicleClass, name, model })
  }
}
