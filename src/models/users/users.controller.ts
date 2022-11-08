import { PrismaService } from 'prisma/prisma.service';

import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/users')
  getUsers(): any {
    return this.prismaService.user.findFirst();
  }
}
