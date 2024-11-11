import { ClassTransformOptions, plainToInstance } from 'class-transformer'
import { validateSync, ValidatorOptions } from 'class-validator'

import { InputValidationError } from '../../errors'
import { validationErrorsToString } from '../../utils/validation/validation-errors-to-string'
import { Constructor } from '../types'

export class BaseValidator {
  validateAndThrow<T extends object>(cls: Constructor<T>, object: T, validatorOptions?: ValidatorOptions): void {
    const defaultOptions: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true
    }
    const options: ClassTransformOptions = { ...defaultOptions, ...validatorOptions }
    let validatableObject = object
    if (!(validatableObject instanceof cls)) {
      validatableObject = plainToInstance(cls, object, { groups: options.groups })
    }
    const errors = validateSync(validatableObject, options)
    if (errors.length > 0) {
      throw new InputValidationError(validationErrorsToString(errors))
    }
  }
}
