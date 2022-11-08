import { PrismaService } from 'prisma/prisma.service';

import { MysqlConfigService } from '@app/config';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [MysqlConfigService, PrismaService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
