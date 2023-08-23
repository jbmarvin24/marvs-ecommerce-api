import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddressDto {
  @ApiProperty({ example: 'Rizal' })
  @MaxLength(100)
  @IsNotEmpty()
  province: string;

  @ApiProperty({ example: 'Cainta' })
  @MaxLength(100)
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'St. Domingo' })
  @MaxLength(100)
  @IsNotEmpty()
  barangay: string;

  @ApiProperty({ example: '445 My street address' })
  @MaxLength(200)
  @IsNotEmpty()
  street: string;
}
