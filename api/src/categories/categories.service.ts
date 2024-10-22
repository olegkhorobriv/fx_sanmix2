import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@sanmix/api/app/common/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // Отримання всіх категорій
  async getCategories(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany({
        include: {
          SubCategories: true,
          Parent: true,
        },
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  // Створення нової категорії
  async createCategory(data: { name: string; parentId?: number }): Promise<Category> {
    try {
      // Якщо категорія головна, призначаємо parentId в null
      const parentId = data.parentId === 0 ? null : data.parentId;

      return await this.prisma.category.create({
        data: {
          name: data.name,
          parentId: parentId,
        },
      });
    } catch (error) {
      console.error('Error creating category:', error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  // Оновлення категорії
  async updateCategory(id: number, data: { name: string; parentId?: number }): Promise<Category> {
    try {
      // Якщо parentId не вказано, дозволяємо призначити 0 або будь-який інший ID
      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  // Видалення категорії
  async deleteCategory(id: number): Promise<void> {
    try {
      await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
