import { Injectable } from '@nestjs/common';
import { PrismaService } from '@sanmix/api/app/common/prisma.service'; // Залежить від шляху до вашого Prisma сервісу
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: { text: string; dueDate: Date }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        text: data.text,
        dueDate: data.dueDate,
        completed: false, // Додай це поле при створенні
      },
    });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { completed: false }, // Повертає тільки невиконані завдання
    });
  }

  async update(id: number, data: { completed: boolean }): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        completed: data.completed,
      },
    });
  }
}
