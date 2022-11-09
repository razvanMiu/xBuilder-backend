import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import MysqlConfigService from './configuration.service';

/**
 * Import and provide mysql configuration related classes.
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(3306),
        DATABASE_USER: Joi.string().default('root'),
        DATABASE_PASSWORD: Joi.string().default('secret'),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [MysqlConfigService],
})
export default class MysqlConfigModule {}
