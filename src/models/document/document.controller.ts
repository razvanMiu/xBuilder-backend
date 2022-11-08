import { Controller, Get } from '@nestjs/common';

import { DocumentService } from './document.service';

@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('*')
  getContent() {
    return this.documentService.getContent();
  }
}
