import { Dictionary, StringMap } from '../validators/types'

export type HttpRequestAttributes = {} & Dictionary<string | any>
export interface IHttpRequest<
  Body = unknown,
  Params = StringMap,
  Query = StringMap,
  Headers = StringMap,
  Attributes = HttpRequestAttributes
> {
  body?: Body
  params?: Params
  query?: Query
  headers?: Headers
  // Custom parameters
  attributes?: Attributes
}
