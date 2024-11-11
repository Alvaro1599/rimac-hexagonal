import { AWS } from '@serverless/typescript'

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'

export type AWSFunction = Exclude<AWS['functions'], undefined>[string]

export type AWSFunctions = AWS['functions']

export type AWSFunctionEvent = Exclude<AWSFunction['events'], undefined>[number]
