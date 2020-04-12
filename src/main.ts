import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ServerConfigurationService } from './configurations/server.configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfigurationService: ServerConfigurationService = app.get(ServerConfigurationService);
  const serverPort: number = serverConfigurationService.port;

  await app.listen(serverPort);
}

bootstrap();
