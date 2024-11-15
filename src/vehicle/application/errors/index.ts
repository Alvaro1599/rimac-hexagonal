import { HttpStatus } from '../enums/http-status'

export class ApplicationError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InputValidationError extends ApplicationError {}

export class HttpError extends Error {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN)
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class EntityNotFound extends InputValidationError {
  constructor(entityName: string, identifier: string) {
    super(`${entityName} with identifier ${identifier} not found`)
  }
}
