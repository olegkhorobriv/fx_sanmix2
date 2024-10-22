import { Controller, Post, Body, Get, HttpException, HttpStatus, Patch, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../common/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.taskService.create(createTaskDto);
    } catch (error) {
      throw new HttpException('Error creating task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: { completed: boolean }) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Get()
  async getTasks() {
    return this.taskService.getAllTasks();
  }
}
