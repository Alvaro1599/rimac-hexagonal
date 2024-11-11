import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

import {
  createVehicleController,
  getVehicleController
} from '../../main/factories/controllers/vehicle.controllers.factory'
import { lambdaHandlerAdapter } from '../adapters/handler.adapter'

export const createVehicle = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2 | string> => {
  const handler = lambdaHandlerAdapter(createVehicleController())
  return await handler(event)
}

export const getVehicle = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2 | string> => {
  const handler = lambdaHandlerAdapter(getVehicleController())
  return await handler(event)
}
