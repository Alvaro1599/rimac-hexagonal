import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { DynamoDbClientProvider } from '../../../infrastructure/providers/dynamodb.provider'
import { Vehicle } from '../../domain/models/vehicle'
import { VehicleRepository } from '../../domain/repositories/vehicleRepository'
import { VehicleEntityMapper } from '../mappers/vehicle-entity.mapper'

export class DynamoDbVehicleRepository implements VehicleRepository {
  private readonly dynamoDbClient: DynamoDBClient
  private readonly tableName: string

  constructor(
    readonly dynamoDbClientProvider: DynamoDbClientProvider,
    readonly mapper: VehicleEntityMapper
  ) {
    this.dynamoDbClient = dynamoDbClientProvider.getClient()
    this.tableName = DynamoDbClientProvider.tableName
  }

  async getById(vehicleId: string): Promise<Vehicle> {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        PK: `VEHICLE#${vehicleId}`,
        SK: `VEHICLE#${vehicleId}`
      })
    }

    const { Item } = await this.dynamoDbClient.send(new GetItemCommand(params))

    if (!Item) return undefined

    const { id, name, model, vehicleClass, passengersQuantity } = unmarshall(Item)

    return this.mapper.toDomainModel({
      id,
      name,
      model,
      vehicleClass,
      passengersQuantity
    })
  }

  async getAll(): Promise<Vehicle[]> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'EntityType = :entityType',
      IndexName: 'EntityTypeIndex',
      ExpressionAttributeValues: {
        ':entityType': { S: 'VEHICLE' }
      }
    }
    const { Items } = await this.dynamoDbClient.send(new QueryCommand(params))
    return Items.map((item) => {
      const { id, name, model, vehicleClass, passengersQuantity } = unmarshall(item)
      return this.mapper.toDomainModel({
        id,
        name,
        model,
        vehicleClass,
        passengersQuantity
      })
    })
  }

  async save(entity: Vehicle): Promise<Vehicle> {
    const vehicleData = this.mapper.toPersistenceEntity(entity)

    const params = {
      TableName: this.tableName,
      Item: marshall({
        PK: `VEHICLE#${vehicleData.id}`,
        SK: `VEHICLE#${vehicleData.id}`,
        ...vehicleData,
        EntityType: 'VEHICLE'
      })
    }

    await this.dynamoDbClient.send(new PutItemCommand(params))
    return this.mapper.toDomainModel(vehicleData)
  }
}
