import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

import { NotFoundException } from '@app/common/exceptions';
import { getUrl } from '@app/common/helpers/url/url';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Document as DocumentModel, Prisma, Type } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class DocumentService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private req: Request,
  ) {}

  async getContent(): Promise<{ [key: string]: any }> {
    const document = new Document(this.prisma, this.req);
    await document.init();

    const content = document.toJSON();

    if (!content) {
      throw new NotFoundException("This content doesn't exist.");
    }

    return document;
  }
}

class Document {
  private properties: DocumentModel & { type: Type };

  constructor(private prisma: PrismaService, private req: Request) {}

  async init() {
    this.properties = await this.prisma.document.findUnique({
      where: {
        path: this.req.url,
      },
      include: {
        type: true,
      },
    });
  }

  toJSON() {
    if (!this.properties) return null;
    return {
      '@id': getUrl(this.req),
      '@type': this.properties.type.title,
      id: this.properties.id,
      uuid: this.properties.uuid,
      created: this.properties.createdAt,
      modified: this.properties.updatedAt,
      ...(this.properties.json as Prisma.JsonObject),
    };
  }
}
