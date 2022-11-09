import HttpCacheInterceptor from '@app/common/interceptors/http-cache.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

import { DocumentService } from './document.service';

@UseInterceptors(HttpCacheInterceptor)
@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('*')
  getContent() {
    return this.documentService.getContent();
  }
}
