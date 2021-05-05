import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  health(): any {
    return { msg: `System's up` };
  }
}
