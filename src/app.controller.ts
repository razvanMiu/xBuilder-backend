import { NotFoundException } from '@app/common/exceptions';
import { CACHE_MANAGER, Controller, Get, Inject, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(@Inject(CACHE_MANAGER) protected readonly cacheManager) {}

  @Get('/favicon.ico')
  ignoreFavicon() {
    throw new NotFoundException('Ignore favicon');
  }

  @Post('@invalidate/cache')
  async clearCache() {
    await this.cacheManager.reset();
    return { success: 'Cache cleared' };
  }
}
