import {
  IsNotEmpty,
  MaxLength,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'Pedro' })
  @IsOptional()
  @MaxLength(500)
  middleName?: string;

  @ApiProperty({
    description: 'Shipping address in a object',
    type: AddressDto,
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @ApiProperty({ example: '5555555' })
  @IsNotEmpty()
  @MaxLength(100)
  phoneNo: string;
}
