import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

import { Helpers } from '../../../../iac/serverless/helpers'
import { Controller } from '../../application/ports/controller'
import { IHttpRequest } from '../../application/ports/http-request'

export const lambdaHandlerAdapter = <T>(
  controller: Controller<T>
): ((event: APIGatewayProxyEventV2) => Promise<APIGatewayProxyResultV2>) => {
  return async (event) => {
    let { body } = event
    if (event.headers['content-type'] === 'application/json' && body) {
      body = Helpers.parseJsonRequestBody(event.body)
    }
    const request: IHttpRequest = {
      body,
      params: event.pathParameters || {},
      query: event.queryStringParameters || {},
      headers: event.headers || {}
    }
    const response = await controller.handleRequest(request)
    return Helpers.toApiGwResponse(response.statusCode, response.body)
  }
}
