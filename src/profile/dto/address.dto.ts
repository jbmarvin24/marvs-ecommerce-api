import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddressDto {
  @MaxLength(100)
  @IsNotEmpty()
  province: string;

  @MaxLength(100)
  @IsNotEmpty()
  city: string;

  @MaxLength(100)
  @IsNotEmpty()
  barangay: string;

  @MaxLength(200)
  @IsNotEmpty()
  street: string;
}
