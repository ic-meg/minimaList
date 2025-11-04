import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Priority, Prisma } from '@prisma/client';
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

  async findAll(username?: string, priority?: 'LOW' | 'MEDIUM' | 'HIGH') {
    try {
      const where: any = {};
      
      // Filter by username if provided
      if (username) {
        where.username = username;
      }
      
      // Filter by priority if provided
      if (priority) {
        where.priority = priority as Priority;
      }
      
      return await this.databaseService.task.findMany({
        where,
      });
    } catch (error) {
      this.logger.error('Error fetching tasks', {
        message: error?.message,
        code: error?.code,
        meta: error?.meta,
        stack: error?.stack,
      });
      // Provide more details in error message for debugging
      const errorMessage = error?.message || 'Unknown error';
      const errorCode = error?.code || 'UNKNOWN';
      throw new InternalServerErrorException(
        `Failed to fetch tasks: ${errorMessage} (${errorCode})`
      );
    }
  }

  async findOne(id: number, username?: string) {
    try {
      const where: any = { id };
      if (username) {
        where.username = username;
      }
      
      const task = await this.databaseService.task.findFirst({ where });
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

  async update(id: number, updateTaskDto: Prisma.taskUpdateInput, username?: string) {
    try {
      const where: any = { id };
      if (username) {
        where.username = username;
      }
      
      return await this.databaseService.task.update({
        where,
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

  async remove(id: number, username?: string) {
    try {
      const where: any = { id };
      if (username) {
        where.username = username;
      }
      
      return await this.databaseService.task.delete({
        where,
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