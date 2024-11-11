import {
  ApplicationError,
  BadRequestError,
  EntityNotFound,
  HttpError,
  InputValidationError,
  InternalServerError,
  NotFoundError
} from '../errors'

interface ErrorMapping {
  [key: string]: new (message: string) => HttpError
}

const errorMappings: ErrorMapping = {
  [ApplicationError.name]: BadRequestError,
  [BadRequestError.name]: BadRequestError,
  [NotFoundError.name]: NotFoundError,
  [EntityNotFound.name]: NotFoundError,
  [InputValidationError.name]: BadRequestError
}

export const mapDomainErrorToHttpError = (error: Error): HttpError => {
  const HttpErrorConstructor = errorMappings[error.constructor.name]

  if (HttpErrorConstructor) {
    return new HttpErrorConstructor(error.message)
  } else {
    // If no matching domain error is found, return a new InternalServerError.
    return new InternalServerError(error.message)
  }
}
