import {
  IsNotEmpty,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsJSON,
  IsNotEmptyObject,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @MaxLength(500)
  middleName?: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @IsNotEmpty()
  @MaxLength(100)
  phoneNo: string;
}
