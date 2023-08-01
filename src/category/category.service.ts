import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newCategory = new Category(createCategoryDto);

    if (createCategoryDto.parentId) {
      const parentCategory = await this.findOneOrThrow(
        createCategoryDto.parentId,
      );

      newCategory.parent = parentCategory;
    }

    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    // TODO: Pagination
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    // Get the original category
    const existingCategory = await this.findOneOrThrow(id);
    const updatedCategory = new Category({
      ...existingCategory,
      ...updateCategoryDto,
    });

    // check if the parentId from updateDto is not null and not equal to existing parent id
    // then update the parent relationship
    // else set the parent to null
    if (
      updateCategoryDto.parentId != null &&
      existingCategory.parentId != updatedCategory.parentId
    ) {
      const parentCategory = await this.findOneOrThrow(
        updateCategoryDto.parentId,
      );

      updatedCategory.parent = parentCategory;
    } else if (updateCategoryDto.parentId == null) {
      updatedCategory.parent == null;
    }

    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOneOrThrow(id);

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

  async findOneOrThrow(id: number) {
    const category = await this.findOne(id);

    if (!category) throw new NotFoundException('Category not found.');

    return category;
  }
}
