import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ServerConfigurationService } from './configurations/server.configuration.service';
import { SwaggerConfigurationService } from './configurations/swagger.configuration.service';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const serverConfigurationService: ServerConfigurationService = app.get(ServerConfigurationService);
  const swaggerConfigurationService: SwaggerConfigurationService = app.get(SwaggerConfigurationService);
  
  const swaggerOptions = new DocumentBuilder()
    .setTitle(swaggerConfigurationService.title)
    .setDescription(swaggerConfigurationService.description)
    .setVersion(swaggerConfigurationService.version)
    .build();
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(swaggerConfigurationService.path, app, swaggerDocument);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(serverConfigurationService.port);
}

bootstrap();
