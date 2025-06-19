import { Module } from '@nestjs/common';
import { AppController } from './common/app.controller';
import { AppService } from './common/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
