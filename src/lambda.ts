import {INestApplication, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {APIGatewayEvent, Context, Handler} from 'aws-lambda';
import {createServer, proxy, Response} from 'aws-serverless-express';
import * as express from 'express';
import {Server} from 'http';
import {Connection, getConnection} from 'typeorm';
import {AppModule} from './app';

export const handler: Handler = async (event: APIGatewayEvent, context: Context): Promise<Response> => {
  const connection: Connection = getConnection();

  if (connection.isConnected) {
    await connection.close();
  }

  const expressApp: express.Express = express();
  const app: INestApplication = await NestFactory.create(AppModule, expressApp);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  const server: Server = createServer(expressApp);

  return proxy(server, event, context, 'PROMISE').promise;
};
