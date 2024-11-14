import type { AWS } from '@serverless/typescript'

import { handleProxy } from './iac/serverless'
import { ENV_VALUES } from './src/infrastructure/config/env'

const serverlessConfiguration: AWS = {
  service: 'rimac-hexagonal',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    stage: ENV_VALUES.STAGE,
    region: ENV_VALUES.AWS_REGION,
    runtime: 'nodejs18.x',
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: ENV_VALUES.STAGE,
      AWS_REGION: ENV_VALUES.AWS_REGION,
      DYNAMODB_TABLE: '${self:service}-table-${opt:stage, "dev"}'
    }
  },
  resources: {
    Resources: {
      EntitiesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.DYNAMODB_TABLE}',
          AttributeDefinitions: [
            { AttributeName: 'PK', AttributeType: 'S' },
            { AttributeName: 'SK', AttributeType: 'S' },
            { AttributeName: 'EntityType', AttributeType: 'S' }
          ],
          KeySchema: [
            { AttributeName: 'PK', KeyType: 'HASH' },
            { AttributeName: 'SK', KeyType: 'RANGE' }
          ],
          BillingMode: 'PAY_PER_REQUEST',
          GlobalSecondaryIndexes: [
            {
              IndexName: 'EntityTypeIndex',
              KeySchema: [{ AttributeName: 'EntityType', KeyType: 'HASH' }],
              Projection: { ProjectionType: 'ALL' }
            }
          ]
        }
      }
    }
  },
  functions: { ...handleProxy },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    },
    'serverless-offline': {
      noAuth: true,
      httpPort: ENV_VALUES.PORT ?? 3000,
      noPrependStageInUrl: true
    }
  }
}

module.exports = serverlessConfiguration
