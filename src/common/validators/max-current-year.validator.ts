import { ValidatorConstraintInterface } from 'class-validator';

export class MaxCurrentYear implements ValidatorConstraintInterface {
  validate(value: number): Promise<boolean> | boolean {
    const currentYear = new Date().getFullYear();
    return value <= currentYear;
  }
  defaultMessage(): string {
    return `The year must be less than or equal to the current year.`;
  }
}
