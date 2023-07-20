import { IsArray, IsNotEmpty, IsNumber, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  categoryId: number;

  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  @IsNotEmpty()
  description: string;

  @IsArray()
  photos: string[];

  @Min(0)
  @IsNumber()
  price: number;

  @Min(0)
  @IsNumber()
  stock: number;

  @MaxLength(100)
  @IsNotEmpty()
  brand: string;
}
