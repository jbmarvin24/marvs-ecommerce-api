import { IsNumber, Min } from 'class-validator';

export class CreateWishlistDto {
  // TODO: validate if user exists
  @Min(0)
  @IsNumber()
  productId: number;
}
