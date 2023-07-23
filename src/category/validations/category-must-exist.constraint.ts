import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from '../category.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class CategoryMustExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private categoryService: CategoryService) {}

  async validate(value: any): Promise<boolean> {
    return await this.categoryService.IsCategoryIdExist(value);
  }
  defaultMessage?(): string {
    return 'categoryId must exist.';
  }
}

export function CategoryMustExist(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOption,
      validator: CategoryMustExistConstraint,
    });
  };
}
