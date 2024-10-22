import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Delete } from '@nestjs/common';
import { Client } from '@prisma/client';
import { CreateClientDto } from '../common/create-client.dto';
import { UpdateClientDto } from '../common/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async getClients(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }

  @Post()
  async createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(createClientDto);
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ): Promise<Client> {
    return this.clientService.updateClient(Number(id), updateClientDto);
  }
  @Delete(':id') // Додайте цей метод
  async deleteClient(@Param('id') id: string): Promise<void> {
    return this.clientService.deleteClient(Number(id));
  }
}
