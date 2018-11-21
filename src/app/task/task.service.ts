import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {TaskDto} from './task.dto';
import {Task} from './task.entity';

@Injectable()
export class TaskService {
  constructor (
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  public async create (dto: TaskDto): Promise<Task> {
    const task: Task = this.taskRepository.create(dto);

    return this.taskRepository.save(task);
  }

  public async readOne (id: string): Promise<Task> {
    return this.taskRepository.findOne(id);
  }

  public async readAll (): Promise<Task[]> {
    return this.taskRepository.find();
  }

  public async update (id: string, dto: TaskDto): Promise<number> {
    const {raw: {affectedRows}}: UpdateResult = await this.taskRepository.update(id, dto);

    return affectedRows;
  }

  public async del (id: string): Promise<number> {
    const {raw: {affectedRows}}: DeleteResult = await this.taskRepository.delete(id);

    return affectedRows;
  }
}
