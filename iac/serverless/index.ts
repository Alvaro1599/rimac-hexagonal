import { Helpers } from './helpers'
import { AWSFunctions } from './types'

export const handleProxy: AWSFunctions = {
  'create-vehicle': {
    handler: Helpers.handlerPath('vehicle/infrastructure/handlers/vehicle-api-index.createVehicle'),
    events: [Helpers.httpApiEvent('POST', 'vehicle')]
  },
  'get-vehicle': {
    handler: Helpers.handlerPath('vehicle/infrastructure/handlers/vehicle-api-index.getVehicle'),
    events: [Helpers.httpApiEvent('GET', 'vehicle')]
  }
}
