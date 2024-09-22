import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from "@sanmix/api/app/common/prisma.service";
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany({
        include: {
          SubCategories: true,
          Parent: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch categories');
    }
  }

  async createCategory(data: any): Promise<Category> {
    try {
      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  
} 
 


// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import {PrismaService} from "@sanmix/api/app/common/prisma.service";
// import { Category } from '@prisma/client';

// @Injectable()
// export class CategoriesService {
//   constructor(private prisma: PrismaService) {}

//   async getCategories(): Promise<Category[]> {
//     try {
//       return await this.prisma.category.findMany({
//         include: {
//           SubCategories: true,
//           Parent: true,
//         },
//       });
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to fetch categories');
//     }
//   }

//   async getCategory(id: number): Promise<Category | null> {
//     try {
//       return await this.prisma.category.findUnique({
//         where: { id },
//         include: {
//           SubCategories: true,
//           Parent: true,
//         },
//       });
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to fetch category');
//     }
//   }

//   async createCategory(data: any): Promise<Category> {
//     try {
//       return await this.prisma.category.create({
//         data,
//       });
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to create category');
//     }
//   }

//   async editCategory(id: number, data: any): Promise<Category> {
//     try {
//       return await this.prisma.category.update({
//         where: { id },
//         data,
//       });
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to update category');
//     }
//   }

//   async deleteCategory(id: number): Promise<void> {
//     try {
//       await this.prisma.category.delete({
//         where: { id },
//       });
//     } catch (error) {
//       throw new InternalServerErrorException('Failed to delete category');
//     }
//   }
// }
