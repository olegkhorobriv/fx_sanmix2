import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Отримання всіх категорій
  @Get()
  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoriesService.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new HttpException('Failed to fetch categories', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Створення нової категорії
  @Post()
  async createCategory(@Body() categoryData: { name: string; parentId?: number }): Promise<Category> {
    try {
      // Перевірка наявності parentId і встановлення значення 0 для головної категорії
      categoryData.parentId = categoryData.parentId === null ? 0 : categoryData.parentId;
      const newCategory = await this.categoriesService.createCategory(categoryData);
      return newCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new HttpException('Failed to create category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Оновлення категорії за id
  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() categoryData: { name: string; parentId?: number }): Promise<Category> {
    try {
      // Перевірка наявності parentId і встановлення значення 0 для головної категорії
      categoryData.parentId = categoryData.parentId === null ? 0 : categoryData.parentId;
      return await this.categoriesService.updateCategory(Number(id), categoryData);
    } catch (error) {
      console.error('Error updating category:', error);
      throw new HttpException('Failed to update category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Видалення категорії за id
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<void> {
    try {
      await this.categoriesService.deleteCategory(Number(id));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new HttpException('Failed to delete category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
