export class TaskService {
  public create: jest.Mock = jest.fn();
  public readOne: jest.Mock = jest.fn();
  public readAll: jest.Mock = jest.fn();
  public update: jest.Mock = jest.fn();
  public del: jest.Mock = jest.fn();
}
