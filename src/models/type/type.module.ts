import { PrismaModule } from 'prisma/prisma.module';

import { Module } from '@nestjs/common';

import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [PrismaModule],
  providers: [TypeService],
  controllers: [TypeController],
})
export class TypeModule {}
