import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import ConfigModule from './config';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [ConfigModule, ModelsModule],
  controllers: [AppController],
})
export class AppModule {}
