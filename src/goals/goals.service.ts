import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

@Injectable()
export class GoalsService {
  async getUserGoals(userId: string) {
    return prisma.goal.findMany({
      where: { ownerId: userId },
      orderBy: { order: 'asc' },
    });
  }

  async create(userId: string, data: CreateGoalDto) {
    // enforce 2-level nesting
    if (data.parentId) {
      const parent = await prisma.goal.findUnique({ where: { id: data.parentId } });
      if (!parent) throw new NotFoundException('Parent goal not found');

      if (parent.parentId) {
        throw new BadRequestException('Max nesting depth exceeded');
      }
    }

    return prisma.goal.create({
      data: {
        ...data,
        deadline: new Date(data.deadline),
        ownerId: userId,
      },
    });
  }

  async update(userId: string, goalId: string, data: UpdateGoalDto) {
    const goal = await prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal || goal.ownerId !== userId) throw new ForbiddenException();

    if (data.parentId) {
      const parent = await prisma.goal.findUnique({ where: { id: data.parentId } });
      if (!parent || parent.parentId) {
        throw new BadRequestException('Invalid parentId (too deep)');
      }
    }

    return prisma.goal.update({
      where: { id: goalId },
      data: {
        ...data,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
        publicId: data.isPublic && !goal.publicId ? uuidv4() : undefined,
      },
    });
  }

  async delete(userId: string, goalId: string) {
    const goal = await prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal || goal.ownerId !== userId) throw new ForbiddenException();
    return prisma.goal.delete({ where: { id: goalId } });
  }

  async getPublicGoals() {
    return prisma.goal.findMany({
      where: { isPublic: true, parentId: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPublicGoalByPublicId(publicId: string) {
    const goal = await prisma.goal.findUnique({ where: { publicId } });
    if (!goal || !goal.isPublic) throw new NotFoundException();

    const children = await prisma.goal.findMany({
      where: { parentId: goal.id },
      orderBy: { order: 'asc' },
    });

    return { goal, children };
  }
}
