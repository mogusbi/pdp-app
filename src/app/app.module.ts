import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as ormconfig from '../../ormconfig';
import {Task, TaskModule} from './task';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      ...ormconfig,
      entities: [
        Task
      ]
    })
  ]
})
export class AppModule {}
