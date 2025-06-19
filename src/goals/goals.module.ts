import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController, PublicGoalsController } from './goals.controller';

@Module({
  controllers: [GoalsController, PublicGoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
