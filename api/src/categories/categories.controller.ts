import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post()
  async createCategory(@Body() categoryData: any) {
    try {
      const newCategory = await this.categoriesService.createCategory(categoryData);
      return newCategory;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
 


// import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
// import { CategoriesService } from './categories.service';
// import { Category } from '@prisma/client';

// @Controller('api/categories')
// export class CategoriesController {
//   constructor(private readonly categoriesService: CategoriesService) {}

//   @Get()
//   async getCategories(): Promise<Category[]> {
//     return this.categoriesService.getCategories();
//   }

//   @Get(':id')
//   async getCategory(@Param('id') id: number): Promise<Category> {
//     return this.categoriesService.getCategory(id);
//   }

//   @Post('create')
//   async createCategory(@Body('input') input: any): Promise<Category> {
//     return this.categoriesService.createCategory(input);
//   }

//   @Post('edit')
//   async editCategory(@Body('input') input: any): Promise<Category> {
//     return this.categoriesService.editCategory(input.id, input);
//   }

//   @Delete('delete/:id')
//   async deleteCategory(@Param('id') id: number): Promise<void> {
//     return this.categoriesService.deleteCategory(id);
//   }
// }
