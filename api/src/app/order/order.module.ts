import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service'; // Шлях до сервісу Prisma має бути правильний
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
