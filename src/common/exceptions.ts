import {
  BadRequestException as NestBadRequestException,
  ForbiddenException as NestForbiddenException,
  NotFoundException as NestNotFoundException,
} from '@nestjs/common';

export class BadRequestException extends NestBadRequestException {
  constructor(objectOrError = 'Bad Request', description = 'Bad Gateway') {
    super(
      {
        error: 'Bad Request',
        statusCode: 400,
        message: objectOrError,
      },
      description,
    );
  }
}

export class ForbiddenException extends NestForbiddenException {
  constructor(objectOrError = 'Forbidden', description = 'Forbidden') {
    super(
      {
        error: 'Forbidden',
        statusCode: 403,
        message: objectOrError,
      },
      description,
    );
  }
}

export class NotFoundException extends NestNotFoundException {
  constructor(objectOrError = 'Not found', description = 'Not found') {
    super(
      {
        error: 'Not found',
        statusCode: 404,
        message: objectOrError,
      },
      description,
    );
  }
}
