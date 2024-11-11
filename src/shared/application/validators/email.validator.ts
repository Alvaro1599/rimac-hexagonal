import { ValidatorConstraintInterface } from 'class-validator'

export class EmailValidator implements ValidatorConstraintInterface {
  validate(value: string): Promise<boolean> | boolean {
    const regex = /@(gmail\.com|hotmail\.com|yahoo\.es)\b/
    return regex.test(value)
  }

  defaultMessage(): string {
    return 'Email must be a valid domain email address'
  }
}
