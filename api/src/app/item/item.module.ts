import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import {PrismaModule} from "@sanmix/api/app/common/prisma.module";

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [PrismaModule],
  exports: [ItemService]
})
export class ItemModule {}
