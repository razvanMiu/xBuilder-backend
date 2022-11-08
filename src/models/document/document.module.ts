import { PrismaModule } from 'prisma/prisma.module';

import { Module } from '@nestjs/common';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [PrismaModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
