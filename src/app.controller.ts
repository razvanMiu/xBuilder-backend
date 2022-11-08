import { NotFoundException } from '@app/common/exceptions';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/favicon.ico')
  ignoreFavicon() {
    throw new NotFoundException('Ignore favicon.');
  }
}
