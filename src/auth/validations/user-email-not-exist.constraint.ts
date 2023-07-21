import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserEmailNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    console.log(this.userService);
    return !(await this.userService.IsEmailExist(value));
  }
  defaultMessage?(): string {
    return 'email is already taken.';
  }
}

export function UserEmailNotExist(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOption,
      validator: UserEmailNotExistConstraint,
    });
  };
}
