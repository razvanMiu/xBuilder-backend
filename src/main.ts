import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  if (appConfig.cors) {
    app.enableCors({
      origin: appConfig.cors,
    });
  }

  await app.listen(appConfig.port);
}
bootstrap();
