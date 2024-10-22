import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from '../common/notification.dto';


@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async create(@Body() CreateNotificationDto: CreateNotificationDto) {
    try {
      return await this.notificationService.createNotification(CreateNotificationDto);
    } catch (error) {
      throw new HttpException('Error creating notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getNotifications() {
    return this.notificationService.getAllNotifications();
  }
}
