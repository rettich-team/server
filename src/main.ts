import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ServerConfigurationService } from './configurations/server.configuration.service';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const serverConfigurationService: ServerConfigurationService = app.get(ServerConfigurationService);
  const serverPort: number = serverConfigurationService.port;

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(serverPort);
}

bootstrap();
