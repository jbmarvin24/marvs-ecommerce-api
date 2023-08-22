import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category', example: 'Clothing' })
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Parent of the category', example: null })
  @Min(1)
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @ApiProperty({
    description: 'Description of the category',
    example: 'An item of clothing',
  })
  @MaxLength(500)
  @IsOptional()
  description: string;
}
