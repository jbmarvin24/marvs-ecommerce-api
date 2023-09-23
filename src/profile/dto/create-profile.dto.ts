import { MaxLength, IsOptional, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'John', required: false })
  @MaxLength(100)
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Doe', required: false })
  @MaxLength(100)
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'Pedro', required: false })
  @MaxLength(500)
  @IsOptional()
  middleName?: string;

  @ApiProperty({
    description: 'Shipping address in a object',
    required: false,
    type: AddressDto,
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @ApiProperty({ example: '(555) 123-4567', required: false })
  @MaxLength(100)
  @IsOptional()
  phoneNo: string;
}
