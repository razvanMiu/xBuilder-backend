import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import AppConfigService from './configuration.service';

/**
 * Import and provide app configuration related classes.
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('backend'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://localhost:8080'),
        APP_PORT: Joi.number().default(8080),
        APP_CORS: Joi.string().default(''),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export default class AppConfigModule {}
