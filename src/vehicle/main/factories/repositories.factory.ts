import { DynamoDbClientProvider } from '../../../infrastructure/providers/dynamodb.provider'
import { VehicleEntityMapper } from '../../infrastructure/mappers/vehicle-entity.mapper'
import { DynamoDbVehicleRepository } from '../../infrastructure/repositories/dynamoDbVehicleRepository'

export const VehicleRepository = (): DynamoDbVehicleRepository =>
  new DynamoDbVehicleRepository(new DynamoDbClientProvider(), new VehicleEntityMapper())
