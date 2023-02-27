import {
  BadRequestException as NestBadRequestException,
  ForbiddenException as NestForbiddenException,
  NotFoundException as NestNotFoundException,
} from '@nestjs/common';

type ObjectError = { [key: string]: any } | string;

export class BadRequestException extends NestBadRequestException {
  constructor(
    objectOrError: ObjectError = 'Bad Request',
    description = 'Bad Gateway',
  ) {
    super(
      {
        statusCode: 400,
        error: 'Bad Request',
        message: objectOrError,
      },
      description,
    );
  }
}

export class ForbiddenException extends NestForbiddenException {
  constructor(
    objectOrError: ObjectError = 'Forbidden',
    description = 'Forbidden',
  ) {
    super(
      {
        statusCode: 403,
        error: 'Forbidden',
        message: objectOrError,
      },
      description,
    );
  }
}

export class NotFoundException extends NestNotFoundException {
  constructor(
    objectOrError: ObjectError = 'Not found',
    description = 'Not found',
  ) {
    super(
      {
        statusCode: 404,
        error: 'Not found',
        message: objectOrError,
      },
      description,
    );
  }
}
