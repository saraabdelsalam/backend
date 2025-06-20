import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  getUserGoals(@Request() req) {
    return this.goalsService.getUserGoals(req.user.userId);
  }

  @Post()
  create(@Request() req, @Body() body: CreateGoalDto) {
    return this.goalsService.create(req.user.userId, body);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() body: UpdateGoalDto) {
    return this.goalsService.update(req.user.userId, id, body);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.goalsService.delete(req.user.userId, id);
  }
}

@Controller('public-goals')
export class PublicGoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  getPublicGoals() {
    return this.goalsService.getPublicGoals();
  }

  @Get(':Id')
  getPublicGoal(@Param('Id') Id: string) {
    return this.goalsService.getPublicGoalByPublicId(Id);
  }
}
