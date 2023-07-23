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

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id },
    });

    return await this.categoryRepository.save(
      new Category({
        ...category,
        ...updateCategoryDto,
      }),
    );
  }

  async remove(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id },
    });

    return this.categoryRepository.remove(category);
  }

  /**
   * Validate the existence of category.
   * @param id Category Id
   * @returns True if category exists.
   */
  async IsCategoryIdExist(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    return Boolean(category);
  }
}
