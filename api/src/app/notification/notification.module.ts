import { Module } from '@nestjs/common';
import { PrismaService } from '@sanmix/api/app/common/prisma.service';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
})
export class NotificationModule {}
