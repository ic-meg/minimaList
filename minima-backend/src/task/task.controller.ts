import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    const data = await this.taskService.create(createTaskDto);
    return {
      message: 'Task created successfully',
      data,
    };
  }

  @Get()
  findAll(@Query('username') username?: string) {
    return this.taskService.findAll(username);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Query('username') username?: string) {
    return this.taskService.findOne(id, username);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDTO,
    @Query('username') username?: string
  ) {
    const data = await this.taskService.update(id, updateTaskDto, username);
    return {
      message: 'Task updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Query('username') username?: string) {
    const data = await this.taskService.remove(id, username);
    return {
      message: 'Task deleted successfully',
      data,
    };
  }
}
