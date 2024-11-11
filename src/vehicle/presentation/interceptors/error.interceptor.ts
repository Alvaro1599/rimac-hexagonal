import { mapDomainErrorToHttpError } from '../../application/mappers/domain-to-http-error.mapper'
import { IHttpRequest } from '../../application/ports/http-request'
import { IHttpResponse } from '../../application/ports/http-response'
import { Interceptor } from '../../application/ports/interceptor'
import { HttpResponse } from '../responses/http-response'

export class ErrorInterceptor implements Interceptor<IHttpRequest, IHttpResponse> {
  onError(error: Error): IHttpResponse {
    const { statusCode, message } = mapDomainErrorToHttpError(error)
    return new HttpResponse(statusCode, { statusCode, message })
  }

  onRequest(request: IHttpRequest): IHttpRequest {
    return request
  }

  onResponse(response: IHttpResponse): IHttpResponse {
    return response
  }
}
