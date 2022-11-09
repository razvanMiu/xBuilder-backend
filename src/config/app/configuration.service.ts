import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 * @class
 */
@Injectable()
export default class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env');
  }
  get development(): boolean {
    return this.configService.get<string>('app.env') === 'development';
  }
  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get url(): string {
    return this.configService.get<string>('app.url');
  }
  get port(): number {
    return Number(this.configService.get<string>('app.port'));
  }
  get cors(): Array<string> {
    const cors = this.configService.get<string>('app.cors');
    if (!cors) return null;
    return cors.split(',');
  }
}
