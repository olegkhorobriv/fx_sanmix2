import { Injectable } from '@nestjs/common';
import { PrismaService } from '@sanmix/api/app/common/prisma.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: { text: string }): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        text: data.text,
      },
    });
  }

  async getAllNotifications(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }
}
