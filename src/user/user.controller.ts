import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { Admin } from '../auth/decorators/admin.decorator';
import { ShopService } from '../shop/shop.service';
import { Response } from '../interceptors/transform-response.interceptor';
import { UserDto, UserPaginatedResponse } from './dto/user.dto';
import { Shop } from '../shop/entities/shop.entity';
import { UserQueryDto } from './dto/user-query.dto';

@Controller('user')
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly shopService: ShopService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  me(@CurrentUser() user: User): Response<User> {
    return new UserDto({
      data: user,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Admin()
  @Get()
  async findAll(@Query() query: UserQueryDto): Promise<UserPaginatedResponse> {
    return new UserPaginatedResponse({
      data: await this.userService.findAllPaginated(query),
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Admin()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<User>> {
    return new UserDto({
      data: await this.userService.findOneOrThrow(id),
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @Admin()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response<User>> {
    return new UserDto({
      data: await this.userService.update(id, updateUserDto),
      message: 'Successfully updated.',
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Admin()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<undefined>> {
    await this.userService.remove(id);

    return new UserDto({
      message: 'Successfully deleted.',
    });
  }

  @Get('me/shops')
  async shops(@CurrentUser() user: User): Promise<Response<Shop[]>> {
    return {
      data: await this.shopService.findByUser(user.id),
    };
  }
}
