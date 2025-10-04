import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.databaseService.task.create({
      data: {
        ...createTaskDto,
      },
    });
  }

  async findAll(priority?: 'Low' | 'Medium' | 'High') {
    if (priority) {
      return this.databaseService.task.findMany({
        where: {
          priority,
        },
      });
    }
    return this.databaseService.task.findMany();
  }

  async findOne(id: number) {
      const task = await this.databaseService.task.findUnique({ where: { id } });
      if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
      return task;
    }
    
  

  async update(id: number, updateTaskDto: Prisma.taskUpdateInput) {
    return this.databaseService.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.task.delete({
      where: {
        id,
      },
    });
  }
}
