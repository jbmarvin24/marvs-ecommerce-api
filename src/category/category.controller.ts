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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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

  @Get()
  async findAll(
    @Query() query: CategoryQueryDto,
  ): Promise<Response<PaginatedResult<Category>>> {
    return {
      data: await this.categoryService.findAllPaginated(query),
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Response<Category>> {
    return {
      data: await this.categoryService.findOne(id),
    };
  }

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
