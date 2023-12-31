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
import { ISuccessResponse } from '../interceptors/transform-response.interceptor';
import { UserDto, UserPaginatedResponse } from './dto/user.dto';
import { Shop } from '../shop/entities/shop.entity';
import { UserQueryDto } from './dto/user-query.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiSuccessResponseDec } from '../decorators/success-response.decorator';
import { ExceptionResponse } from '../filters/all-exception.filter';
import { ApiPaginatedResponseDec } from '../decorators/paginated-response.decorator';
import { OrderService } from '../order/order.service';
import { OrderQueryDto } from '../order/dto/order-query.dto';
import { Order } from '../order/entities/order.entity';
import { PaginatedResult } from '../lib/pagination/paginator.lib';
import { OrderParticular } from '../order/entities/order-particular.entity';
import { ShopQueryDto } from '../shop/dto/shop-query.dto';

@ApiTags('User')
@Controller('user')
@SerializeOptions({ strategy: 'excludeAll' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly shopService: ShopService,
    private readonly orderService: OrderService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the current user.' })
  @ApiSuccessResponseDec(User)
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  me(@CurrentUser() user: User): ISuccessResponse<User> {
    return new UserDto({
      data: user,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all the users.' })
  @ApiPaginatedResponseDec(User)
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Admin()
  @Get()
  async findAll(@Query() query: UserQueryDto): Promise<UserPaginatedResponse> {
    return new UserPaginatedResponse({
      data: await this.userService.findAllPaginated(query),
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user' })
  @ApiSuccessResponseDec(User)
  @ApiNotFoundResponse({
    description: 'User not found.',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Id of the user.' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Admin()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<User>> {
    return new UserDto({
      data: await this.userService.findOneOrThrow(id),
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user.' })
  @ApiSuccessResponseDec(User)
  @ApiNotFoundResponse({
    description: 'User not found.',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Id of the user.' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @Admin()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ISuccessResponse<User>> {
    return new UserDto({
      data: await this.userService.update(id, updateUserDto),
      message: 'Successfully updated.',
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiSuccessResponseDec()
  @ApiNotFoundResponse({
    description: 'User not found.',
    type: ExceptionResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @ApiForbiddenResponse({
    description: 'Access to resource is not allowed',
    type: ExceptionResponse,
  })
  @ApiParam({ name: 'id', description: 'Id of the user.' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Admin()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ISuccessResponse<undefined>> {
    await this.userService.remove(id);

    return new UserDto({
      message: 'Successfully deleted.',
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's shops" })
  @ApiPaginatedResponseDec(Shop)
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @Get('me/shops')
  async shops(
    @Query() query: ShopQueryDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<PaginatedResult<Shop>>> {
    query.userId = user.id;

    return {
      data: await this.shopService.findAllPaginated(query),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's orders" })
  @ApiPaginatedResponseDec(OrderParticular)
  @ApiUnauthorizedResponse({
    description: 'Authentication is required',
    type: ExceptionResponse,
  })
  @Get('me/orders')
  async orders(
    @Query() query: OrderQueryDto,
    @CurrentUser() user: User,
  ): Promise<ISuccessResponse<PaginatedResult<OrderParticular>>> {
    return {
      data: await this.orderService.findAllByUser(user.id, query),
    };
  }
}
