import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from '@sanmix/api/app/common/prisma.service';
import { CreateClientDto } from '../common/create-client.dto';
import { UpdateClientDto } from '../common/update-client.dto';

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

  async createClient(data: CreateClientDto): Promise<Client> {
    try {
      return await this.prisma.client.create({ data });
    } catch (error) {
      this.logger.error('Error creating a new client', error.stack);
      throw new InternalServerErrorException('Could not create client');
    }
  }

  async updateClient(id: number, data: UpdateClientDto): Promise<Client> {
    try {
      return await this.prisma.client.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(`Error updating client with id ${id}`, error.stack);
      throw new InternalServerErrorException('Could not update client');
    }
  }

  async deleteClient(id: number): Promise<void> {
    try {
      await this.prisma.client.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting client with id ${id}`, error.stack);
      throw new InternalServerErrorException('Could not delete client');
    }
  }
}
