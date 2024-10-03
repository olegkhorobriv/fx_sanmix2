import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: { orderDate: Date; city: string; status: string; productNames: string; userId: number }): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        Client: true, // Підключаємо клієнта для додаткової інформації
      },
    });
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
