import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Roles } from "@sanmix/api/app/common/roles.decorator";
import { RolesEnum } from "@sanmix/ui/@common/roles.enum";
import { ItemService } from "@sanmix/api/app/item/item.service";
import { Import1CTable } from "../../../../@libs/models/common.model";
import { AuthGuard } from "@sanmix/api/app/common/auth.guard";
import { Item } from '@prisma/client';
import { CreateItemDto } from '../common/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private service: ItemService) {}

  @Get()
  async getItems() {
    return this.service.getAllItems();
  }

  @Get(':id')
  async getItemById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Item> {
    const item = await this.service.getItemById(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  @Post()
  async createItem(@Body() createData: CreateItemDto): Promise<Item> {
    return this.service.createItem(createData);
  }

  @Put(':id')
  async updateItem(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateData: Partial<Item>
  ): Promise<Item> {
    const updatedItem = await this.service.updateItem(id, updateData);
    if (!updatedItem) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return updatedItem;
  }

  @Delete(':id')
  async deleteItem(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.service.deleteItem(id);
  }

  @Post('import1c')
  @UseGuards(AuthGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  public async import1c(@Body('data') data: Import1CTable[]) {
    return await this.service.import1c(data);
  }
}
