import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskController} from './task.controller';
import {Task} from './task.entity';
import {TaskService} from './task.service';

@Module({
  controllers: [
    TaskController
  ],
  imports: [
    TypeOrmModule.forFeature([Task], process.env.NODE_ENV === 'test' ? 'test' : undefined)
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule {}
