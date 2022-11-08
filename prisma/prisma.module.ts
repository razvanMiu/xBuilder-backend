import { MysqlConfigService } from '@app/config';
import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [MysqlConfigService, PrismaService],
  exports: [MysqlConfigService, PrismaService],
})
export class PrismaModule {}
