import {MigrationInterface, QueryRunner} from 'typeorm';
import {Task} from '../app/task';

export class PopulateTasks1542813367315 implements MigrationInterface {
  private table: string = 'task';
  private tasks: Task[] = [
    {
      createdAt: new Date(2018, 11, 21, 11, 30),
      id: '7660f49e-6c9a-4c64-9418-82fbbb87fe48',
      name: 'Create repo',
      updatedAt: new Date(2018, 11, 21, 11, 30)
    },
    {
      createdAt: new Date(2018, 11, 21, 11, 45),
      id: '0c8c6a89-e4d2-4599-a7bd-6d32679a5dc1',
      name: 'Install dependencies',
      updatedAt: new Date(2018, 11, 21, 11, 45)
    },
    {
      createdAt: new Date(2018, 11, 21, 13, 30),
      id: '7b494531-601e-475b-bc11-e943b6101ee6',
      name: 'Provision database',
      updatedAt: new Date(2018, 11, 21, 13, 30)
    },
    {
      createdAt: new Date(2018, 11, 21, 15, 15),
      id: '9549cbf9-d2f8-4d68-a052-b5ac786fb3f0',
      name: 'Create first endpoint',
      updatedAt: new Date(2018, 11, 21, 15, 15)
    }
  ];

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into(this.table)
      .values(this.tasks)
      .execute();
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .manager
      .createQueryBuilder()
      .delete()
      .from(this.table)
      .whereInIds(this.tasks.map(({id}: Task): string => id))
      .execute();
  }
}
