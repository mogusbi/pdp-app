import {Test, TestingModule} from '@nestjs/testing';
import {TaskController} from './task.controller';
import {TaskService} from './task.service';

jest.mock('./task.service');

describe('TaskController', (): void => {
  let controller: TaskController;
  let service: jest.Mocked<TaskService>;

  beforeEach(async (): Promise<void> => {
    const testingModule: TestingModule = await Test
      .createTestingModule({
        controllers: [
          TaskController
        ],
        providers: [
          TaskService
        ]
      })
      .compile();

    controller = testingModule.get(TaskController);
    service = testingModule.get(TaskService);
  });

  describe('httpGetAll', (): void => {
    it('should call taskService.readAll with the correct params', async (): Promise<void> => {
      await controller.httpGetAll();

      expect(service.readAll).toHaveBeenCalledWith();
    });
  });

  describe('httpGetOne', (): void => {
    it('should call taskService.readOne with the correct params', async (): Promise<void> => {
      await controller.httpGetOne('task-id');

      expect(service.readOne).toHaveBeenCalledWith('task-id');
    });
  });

  describe('httpPatch', (): void => {
    it('should call taskService.update with the correct params', async (): Promise<void> => {
      await controller.httpPatch('task-id', {
        name: 'renamed task'
      });

      expect(service.update).toHaveBeenCalledWith('task-id', {
        name: 'renamed task'
      });
    });
  });

  describe('httpPost', (): void => {
    it('should call taskService.create with the correct params', async (): Promise<void> => {
      await controller.httpPost({
        name: 'renamed task'
      });

      expect(service.create).toHaveBeenCalledWith({
        name: 'renamed task'
      });
    });
  });

  describe('httpDelete', (): void => {
    it('should call taskService.del with the correct params', async (): Promise<void> => {
      await controller.httpDelete('task-id');

      expect(service.del).toHaveBeenCalledWith('task-id');
    });
  });
});
