import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import CacheConfigService from './configuration.service';

/**
 * Import and provide cache configuration related classes.
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        CACHE_HOST: Joi.string().default('localhost'),
        CACHE_PORT: Joi.number().default(6379),
        CACHE_TTL: Joi.number().default(5000),
      }),
    }),
  ],
  providers: [ConfigService, CacheConfigService],
  exports: [CacheConfigService],
})
export default class CacheConfigModule {}
