import { Module } from '@nestjs/common';
import {PrismaService} from "@sanmix/api/app/common/prisma.service";
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  controllers: [ClientController], 
  providers: [ClientService, PrismaService],
  
})
export class ClientModule {}
