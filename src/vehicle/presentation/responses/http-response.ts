import { HttpStatus } from '../../application/enums/http-status'
import { IHttpResponse } from '../../application/ports/http-response'

export class HttpResponse<T = unknown> implements IHttpResponse<T> {
  constructor(
    public statusCode: number,
    public body: T,
    public headers?: { [key: string]: string }
  ) {}
}
export class CreatedHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.CREATED, body, headers)
  }
}
export class OkHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.OK, body, headers)
  }
}

export class NoContentHttpResponse<T = unknown> extends HttpResponse<T> {
  constructor(body: T, headers?: { [key: string]: string }) {
    super(HttpStatus.NO_CONTENT, body, headers)
  }
}
