import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from "@sanmix/api/app/common/prisma.service";
import { Client } from '@prisma/client';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(private prisma: PrismaService) {}

  async getAllClients(): Promise<Client[]> {
    try {
      return await this.prisma.client.findMany();
    } catch (error) {
      this.logger.error('Error fetching clients from the database', error.stack);
      throw new InternalServerErrorException('Could not fetch clients');
    }
  }
}
  