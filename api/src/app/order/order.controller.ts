import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../common/createOrderDto.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      throw new HttpException('Error creating order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: Partial<{ status: string; city: string; productNames: string }>) {
    try {
      const orderId = parseInt(id, 10);
      return await this.orderService.updateOrder(orderId, updateOrderDto);
    } catch (error) {
      throw new HttpException('Error updating order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    try {
      const orderId = parseInt(id, 10);
      return await this.orderService.deleteOrder(orderId);
    } catch (error) {
      throw new HttpException('Error deleting order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
