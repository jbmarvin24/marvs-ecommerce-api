import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ description: 'Shop name', example: 'Blissful Haven Crafts' })
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example:
      'Explore a world of creativity and artistry at Blissful Haven Crafts! We curate a diverse collection of handcrafted items that add a touch of elegance and uniqueness to your life. From intricately designed ceramics to beautifully woven textiles, our creations are a celebration of skilled artisans from around the globe. Step into our haven of craftsmanship and discover pieces that resonate with your soul.',
  })
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    example: '123 Artisan Lane, Suite 45, Creativeburg, Artville',
  })
  @IsOptional()
  @MaxLength(500)
  address: string;

  @ApiProperty({ example: 'shop-photo.png' })
  @IsOptional()
  photo: string;

  @ApiProperty({ example: 'www.BlissfulHavenCrafts.com' })
  @IsOptional()
  website: string;

  @ApiProperty({ example: 'info@blissfulhavencrafts.com' })
  @IsOptional()
  email: string;

  @ApiProperty({ example: '(555) 123-4567' })
  @IsNotEmpty()
  @MaxLength(50)
  phoneNo: string;
}
