import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Admin } from '../auth/decorators/admin.decorator';
import { Response } from '../interceptors/transform-response.interceptor';
import { Category } from './entities/category.entity';
import { CategoryQueryDto } from './dto/category-query.dto';
import { PaginatedResult } from '../lib/pagination/paginator.lib';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiStandardResponse } from '../auth/decorators/success-response.decorator';
import { ApiCreatedResponseCustom } from '../auth/decorators/created-response.decorator';
import { ApiPaginatedResponse } from '../auth/decorators/paginated-response.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a category' })
  @ApiCreatedResponseCustom(Category)
  @ApiBadRequestResponse({ description: 'Invalid inputs' })
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @Admin()
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Response<Category>> {
    return {
      data: await this.categoryService.create(createCategoryDto),
      message: 'Successfully created',
    };
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiPaginatedResponse(Category)
  @Public()
  @Get()
  async findAll(
    @Query() query: CategoryQueryDto,
  ): Promise<Response<PaginatedResult<Category>>> {
    return {
      data: await this.categoryService.findAllPaginated(query),
    };
  }

  @ApiOperation({ summary: 'Find a category' })
  @ApiStandardResponse(Category)
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'Category Id', example: 1 })
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Category>> {
    return {
      data: await this.categoryService.findOne(id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a category' })
  @ApiStandardResponse(Category)
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'Category Id', example: 1 })
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @Admin()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Response<Category>> {
    return {
      data: await this.categoryService.update(id, updateCategoryDto),
      message: 'Successfully updated.',
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a category' })
  @ApiStandardResponse()
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiParam({ name: 'id', description: 'Category Id', example: 1 })
  @ApiUnauthorizedResponse({ description: 'Authentication is required' })
  @Admin()
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<undefined>> {
    await this.categoryService.remove(id);

    return {
      message: 'Successfully deleted.',
    };
  }
}
