import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '@prisma/client';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async getClients(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }
}
 