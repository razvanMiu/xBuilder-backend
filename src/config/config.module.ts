import { Module } from '@nestjs/common';

import AppConfigModule from './app/configuration.module';
import MysqlConfigModule from './database/mysql/configuration.module';

/**
 * Import and provide all configuration related classes.
 * @module
 */
@Module({
  imports: [AppConfigModule, MysqlConfigModule],
})
export default class ConfigModule {}
