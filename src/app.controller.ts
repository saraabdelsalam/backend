import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return { msg: 'Access granted!' };
  }
}
