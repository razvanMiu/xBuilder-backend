import { Module } from '@nestjs/common';

import { DocumentModule } from './document/document.module';
import { TypeModule } from './type/type.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeModule, DocumentModule],
})
export default class ModelsModules {}
