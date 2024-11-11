import * as pathF from 'path'

import { APIGatewayProxyResult } from 'aws-lambda'

import { AWSFunctionEvent, HttpMethods } from './types'

export class Helpers {
  static getHandler(handler: string): string {
    return `./src/infrastructure/handlers/${handler}`
  }

  static handlerPath(context: string): string {
    return `${pathF
      .join(__dirname, '../../src/' + context)
      .split(process.cwd())[1]
      .substring(1)
      .replace(/\\/g, '/')}`
  }

  static httpApiEvent(method: HttpMethods, path: string): AWSFunctionEvent {
    return {
      http: {
        method,
        path
      }
    }
  }

  static toApiGwResponse(statusCode: number, body?: any): APIGatewayProxyResult {
    return {
      statusCode,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }
    }
  }

  static parseJsonRequestBody<T>(body: string | null): T {
    try {
      return JSON.parse(body) as T
    } catch (error) {
      throw new Error('Invalid JSON format in request body')
    }
  }
}
