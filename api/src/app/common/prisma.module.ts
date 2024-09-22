import { Module } from '@nestjs/common';
import {PrismaService} from "@sanmix/api/app/common/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {

}
