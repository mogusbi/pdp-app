import {Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {TaskDto} from './task.dto';
import {Task} from './task.entity';

@Injectable()
export class TaskService {
  constructor (
    private readonly task: Repository<Task>
  ) {}

  public async create (dto: TaskDto): Promise<Task> {
    const task: Task = this.task.create(dto);

    return this.task.save(task);
  }

  public async readOne (id: string): Promise<Task> {
    return this.task.findOne(id);
  }

  public async readAll (): Promise<Task[]> {
    return this.task.find();
  }

  public async update (id: string, dto: TaskDto): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.task.update(id, dto);

    return affectedRows;
  }

  public async del (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.task.delete(id);

    return affectedRows;
  }
}
