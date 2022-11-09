/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redisStore } from 'cache-manager-redis-store';

import { CacheModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import ConfigModules, { CacheConfigService } from './config';
import CacheConfigModule from './config/cache/configuration.module';
import ModelsModules from './models/models.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [CacheConfigModule],
      // @ts-ignore-next-line
      useFactory: async (config: CacheConfigService) => {
        return {
          // @ts-ignore
          store: async () => {
            // @ts-ignore
            return await redisStore({
              // Store-specific configuration:
              socket: {
                host: config.host,
                port: config.port,
              },
              ttl: config.ttl,
            });
          },
        };
      },
      inject: [CacheConfigService],
    }),
    ConfigModules,
    ModelsModules,
  ],
  controllers: [AppController],
})
export class AppModule {}
