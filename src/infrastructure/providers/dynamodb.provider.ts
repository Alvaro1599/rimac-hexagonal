import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

import { ENV_VALUES } from '../config/env'

export class DynamoDbClientProvider {
  private static instance: DynamoDbClientProvider
  private readonly dynamoDbClient: DynamoDBClient
  static tableName = ENV_VALUES.DYNAMODB_TABLE

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({})
  }

  public static getInstance(): DynamoDbClientProvider {
    if (!DynamoDbClientProvider.instance) {
      DynamoDbClientProvider.instance = new DynamoDbClientProvider()
    }
    return DynamoDbClientProvider.instance
  }

  public getClient(): DynamoDBClient {
    return this.dynamoDbClient
  }
}
