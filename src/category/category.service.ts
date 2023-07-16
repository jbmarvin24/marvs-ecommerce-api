import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(new Category(createCategoryDto));
  }

  async findAll(): Promise<Category[]> {
    // TODO: Pagination
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    category: Category,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryRepository.save(
      new Category({
        ...category,
        ...updateCategoryDto,
      }),
    );
  }

  async remove(category: Category): Promise<Category> {
    return this.categoryRepository.remove(category);
  }
}
