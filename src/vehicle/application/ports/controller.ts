import { IHttpRequest } from './http-request'
import { IHttpResponse } from './http-response'

export interface Controller<T> {
  // eslint-disable-next-line no-undef
  handleRequest(request: IHttpRequest<unknown, unknown, unknown, unknown, unknown>): Promise<IHttpResponse<T>>
}
