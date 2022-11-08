import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with mysql config based operations.
 * @class
 */
@Injectable()
export default class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('mysql.type');
  }
  get host(): string {
    return this.configService.get<string>('mysql.host');
  }
  get port(): number {
    return Number(this.configService.get<string>('mysql.port'));
  }
  get username(): string {
    return this.configService.get<string>('mysql.username');
  }
  get password(): string {
    return this.configService.get<string>('mysql.password');
  }
  get database(): string {
    return this.configService.get<string>('mysql.database');
  }
  get url(): string {
    return this.configService.get<string>('mysql.url');
  }
}
