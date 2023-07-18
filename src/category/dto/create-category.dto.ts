import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCategoryDto {
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @Min(1)
  @IsNumber()
  @IsOptional()
  parentId: number;

  @MaxLength(500)
  @IsOptional()
  description: string;
}
