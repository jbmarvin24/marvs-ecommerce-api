import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { CategoryMustExist } from '../../category/validations/category-must-exist.constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  //TODO: Validate shop existence
  @ApiProperty({ example: 1 })
  @IsNumber()
  shopId: number;

  @ApiProperty({ example: 1 })
  @CategoryMustExist()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 'IPhone Pro Max++' })
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'The ultimate phone.' })
  @MaxLength(500)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Product photos in array of strings',
    example: ['product1.png'],
  })
  @IsArray()
  @IsOptional()
  photos: string[];

  @ApiProperty({ example: 25000 })
  @Min(0)
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10 })
  @Min(0)
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'Apple' })
  @MaxLength(100)
  @IsNotEmpty()
  brand: string;
}
