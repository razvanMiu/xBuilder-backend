import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with cache config based operations.
 * @class
 */
@Injectable()
export default class CacheConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('cache.host');
  }

  get port(): number {
    return Number(this.configService.get<string>('cache.port'));
  }

  get ttl(): number {
    return Number(this.configService.get<string>('cache.ttl'));
  }
}
