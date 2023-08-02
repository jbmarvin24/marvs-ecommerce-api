import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { CategoryMustExist } from '../../category/validations/category-must-exist.constraint';

export class CreateProductDto {
  @CategoryMustExist()
  @IsNumber()
  categoryId: number;

  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
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
