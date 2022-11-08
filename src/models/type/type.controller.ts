import { Controller, Get, Param } from '@nestjs/common';

import { TypeService } from './type.service';

@Controller()
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get('/@types')
  getTypes(): any {
    return this.typeService.getTypes();
  }

  @Get('/@types/:id')
  getType(@Param('id') id: string): any {
    return this.typeService.getType(id);
  }
}
