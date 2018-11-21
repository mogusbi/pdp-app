import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TaskModule} from './task';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot()
  ]
})
export class AppModule {}
