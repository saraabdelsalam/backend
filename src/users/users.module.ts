import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // 👈 Make sure it's exported
})
export class UsersModule {}
