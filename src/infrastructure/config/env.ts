import 'dotenv/config'

import { T_AWS_REGION } from './types'

interface I_ENV {
  AWS_REGION: T_AWS_REGION
  STAGE: string
  DYNAMODB_TABLE: string
  PORT: string
}

export const ENV_VALUES: I_ENV = {
  AWS_REGION: process.env.AWS_REGION as T_AWS_REGION,
  STAGE: process.env.STAGE ?? 'dev',
  DYNAMODB_TABLE: process.env.DYNAMODB_TABLE,
  PORT: process.env.PORT
}
