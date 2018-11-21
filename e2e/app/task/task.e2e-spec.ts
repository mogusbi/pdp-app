import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as supertest from 'supertest';
import {TaskModule} from '../../../src/app/task';

describe('Tasks endpoint', (): void => {
  let app: INestApplication;
  let id: string = null;
  let client: supertest.SuperTest<supertest.Request>;

  beforeAll(async (): Promise<void> => {
    const testingModule: TestingModule = await Test
      .createTestingModule({
        imports: [
          TaskModule,
          TypeOrmModule.forRoot(<TypeOrmModuleOptions>'test')
        ]
      })
      .compile();

    app = testingModule.createNestApplication();

    await app.init();

    client = supertest(app.getHttpServer());
  });

  afterAll(async (): Promise<void> => {
    await app.close();
  });

  describe('[GET] /tasks', (): void => {
    it('should return a list of all tasks', async (): Promise<void> => {
      const {body, status}: supertest.Response = await client.get('/tasks');

      expect(status).toEqual(200);
      expect(body).toEqual([
        {
          createdAt: '2018-12-21T11:45:00.000Z',
          id: '0c8c6a89-e4d2-4599-a7bd-6d32679a5dc1',
          name: 'Install dependencies',
          updatedAt: '2018-12-21T11:45:00.000Z'
        },
        {
          createdAt: '2018-12-21T11:30:00.000Z',
          id: '7660f49e-6c9a-4c64-9418-82fbbb87fe48',
          name: 'Create repo',
          updatedAt: '2018-12-21T11:30:00.000Z'
        },
        {
          createdAt: '2018-12-21T13:30:00.000Z',
          id: '7b494531-601e-475b-bc11-e943b6101ee6',
          name: 'Provision database',
          updatedAt: '2018-12-21T13:30:00.000Z'
        },
        {
          createdAt: '2018-12-21T15:15:00.000Z',
          id: '9549cbf9-d2f8-4d68-a052-b5ac786fb3f0',
          name: 'Create first endpoint',
          updatedAt: '2018-12-21T15:15:00.000Z'
        }
      ]);
    });
  });

  describe('[GET] /tasks/:id', (): void => {
    it('should return a specific task', async (): Promise<void> => {
      const {body, status}: supertest.Response = await client.get('/tasks/7660f49e-6c9a-4c64-9418-82fbbb87fe48');

      expect(status).toEqual(200);
      expect(body).toEqual({
        createdAt: '2018-12-21T11:30:00.000Z',
        id: '7660f49e-6c9a-4c64-9418-82fbbb87fe48',
        name: 'Create repo',
        updatedAt: '2018-12-21T11:30:00.000Z'
      });
    });
  });

  describe('[POST] /tasks', (): void => {
    it('should create a new task', async (): Promise<void> => {
      const {body, status}: supertest.Response = await client.post('/tasks').send({
        name: 'Run integration tests'
      });

      id = body.id;

      expect(status).toEqual(201);
      expect(body).toMatchObject({
        name: 'Run integration tests'
      });
    });
  });

  describe('[PATCH] /tasks/:id', (): void => {
    it('should update a specific task', async (): Promise<void> => {
      const {body, status}: supertest.Response = await client.patch(`/tasks/${id}`).send({
        name: 'Run all testing'
      });

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });
  });

  describe('[DELETE] /tasks/:id', (): void => {
    it('should delete a task', async (): Promise<void> => {
      const {body, status}: supertest.Response = await client.delete(`/tasks/${id}`);

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });
  });
});
