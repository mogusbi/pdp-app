import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {TaskDto} from './task.dto';
import {Task} from './task.entity';
import {TaskService} from './task.service';

@Controller('task')
export class TaskController {
  constructor (
    private readonly taskService: TaskService
  ) {}

  @Get()
  public async httpGetAll (): Promise<Task[]> {
    return this.taskService.readAll();
  }

  @Get(':id')
  public async httpGetOne (
    @Param('id') id: string
  ): Promise<Task> {
    return this.taskService.readOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async httpPatch (
    @Param('id') id: string,
    @Body() body: TaskDto
  ): Promise<void> {
    await this.taskService.update(id, body);
  }

  @Post()
  public async httpPost (
    @Body() body: TaskDto
  ): Promise<Task> {
    return this.taskService.create(body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async httpDelete (
    @Param('id') id: string
  ): Promise<void> {
    await this.taskService.del(id);
  }
}
