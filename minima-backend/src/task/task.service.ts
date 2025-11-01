import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      return await this.databaseService.task.create({
        data: {
          ...createTaskDto,
        },
      });
    } catch (error) {
      this.logger.error('Error creating task', error);
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(priority?: 'Low' | 'Medium' | 'High') {
    try {
      if (priority) {
        return await this.databaseService.task.findMany({
          where: {
            priority,
          },
        });
      }
      return await this.databaseService.task.findMany();
    } catch (error) {
      this.logger.error('Error fetching tasks', error);
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.databaseService.task.findUnique({ where: { id } });
      if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error fetching task with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to fetch task');
    }
  }

  async update(id: number, updateTaskDto: Prisma.taskUpdateInput) {
    try {
      return await this.databaseService.task.update({
        where: {
          id,
        },
        data: updateTaskDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      this.logger.error(`Error updating task with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.task.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      this.logger.error(`Error deleting task with ID ${id}`, error);
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}