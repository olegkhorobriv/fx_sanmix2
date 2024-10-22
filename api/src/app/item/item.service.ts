import { Inject, Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '@sanmix/api/app/common/prisma.service';
import { Import1CTable } from '../../../../@libs/models/common.model';
import { REQUEST } from '@nestjs/core';
import { Item, Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { CreateItemDto } from '../common/create-item.dto';

@Injectable({ scope: Scope.REQUEST })
export class ItemService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  public async getAllItems() {
    return this.prisma.item.findMany({
      include: {
        Category: true,
        Vendor: true,
      },
    });
  }

  async getItemById(id: string): Promise<Item | null> {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        Category: true,
        Vendor: true,
      },
    });
  }

  async createItem(createData: CreateItemDto): Promise<Item> {
    return this.prisma.item.create({
      data: {
        ...createData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        Category: true,
        Vendor: true,
      },
    });
  }

  async updateItem(id: string, updateData: Partial<Item>): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.prisma.item.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        Category: true,
        Vendor: true,
      },
    });
  }

  async deleteItem(id: string): Promise<void> {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    await this.prisma.item.delete({ where: { id } });
  }

  public async import1c(data: Import1CTable[]) {
    const userId = this.request['user']?.id;

    const toCreate: Prisma.ItemCreateManyInput[] = [];
    const createCats = [];
    let createdCats = 0;
    let createdItems = 0;

    const cats = data.filter(i => i.isCategory === true);
    let existingCats = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    try {
      if (cats.length > 0) {
        const absent = [];
        cats.forEach(c => {
          if (!existingCats.find(e => e.name == c['Наименование'])) {
            absent.push(c);
          }
        });

        if (absent.length) {
          absent.forEach(a => {
            createCats.push({
              name: a['Наименование']?.trim(),
              key: a['Наименование']?.trim(),
              parentId: existingCats.find(e => e.name == a.parentCategory)?.id,
            });
          });

          const { count } = await this.prisma.category.createMany({
            data: createCats,
          });
          createdCats = count;

          existingCats = await this.prisma.category.findMany({
            select: {
              id: true,
              name: true,
            },
          });
        }
      }

      const items = data.filter(i => !i.isCategory);

      if (items.length) {
        const searchNames = items.map(i => i['Наименование']);
        const existingItems = await this.prisma.item.findMany({
          where: {
            title: {
              in: searchNames,
            },
          },
        });
        items.forEach(i => {
          const search = existingItems.find(e => e.title == i['Наименование']?.toString());

          if (!search) {
            toCreate.push({
              code1C: i['Код']?.toString(),
              dealerCode: i['Артикул']?.toString(),
              title: i['Наименование']?.toString(),
              fullTitle: i['Полное наименование']?.toString(),
              comment: i['Комментарий'],
              type: i['Вид номенклатуры']?.toString(),
              unit: i['Базова одиниця вимірювання']?.toString(),
              tax: parseFloat(i['Ставка НДС']?.split('%')?.[0]?.trim()),
              categoryId: existingCats.find(e => e.name === i['parentCategory'])?.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              updatedBy: userId,
            } as Prisma.ItemCreateManyInput);
          }
        });

        if (toCreate.length) {
          try {
            const { count } = await this.prisma.item.createMany({
              data: [...toCreate],
              skipDuplicates: true,
            });
            createdItems = count;
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      return error;
    }

    return {
      createdCats,
      createdItems,
    };
  }
}
