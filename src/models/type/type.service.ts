import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

import { getApiUrl } from '@app/common';
import { NotFoundException } from '@app/common/exceptions';
import { mergeSchemas } from '@app/common/helpers/schema/schema';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Injectable()
export class TypeService {
  private schema;

  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async getType(id: string) {
    const type = await this.prisma.type.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        schema: true,
        behaviors: {
          select: {
            schema: true,
          },
        },
      },
    });

    if (!type) {
      throw new NotFoundException("This content-type doesnt't exist.");
    }

    const schema = mergeSchemas(
      ...type.behaviors.map((behavior) => behavior.schema),
      type.schema as Prisma.JsonObject,
    );

    this.schema = schema;

    return {
      '@id': `${getApiUrl(this.req)}/@types/${type.id}`,
      id: type.id,
      title: type.title,
      ...this.schema,
    };
  }

  async getTypes() {
    const types = await this.prisma.type.findMany({
      select: { id: true, title: true },
    });

    return types.map((type) => ({
      '@id': `${getApiUrl(this.req)}/@types/${type.id}`,
      id: type.id,
      title: type.title,
    }));
  }
}
