import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { VoucherTypeService } from '../voucher-type.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class VoucherTypeMustExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private voucherTypeService: VoucherTypeService) {}

  async validate(value: any): Promise<boolean> {
    const voucherType = await this.voucherTypeService.findOne(value);

    return Boolean(voucherType);
  }
  defaultMessage?(): string {
    return 'voucherTypeId must exist in Voucher Types.';
  }
}

export function VoucherTypeMustExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: VoucherTypeMustExistConstraint,
    });
  };
}
