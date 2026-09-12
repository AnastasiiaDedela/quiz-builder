import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateQuizDto } from './dto/create-quiz.dto.js';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q, i) => ({
            type: q.type,
            text: q.text,
            options: q.options ? JSON.stringify(q.options) : null,
            order: q.order ?? i,
          })),
        },
      },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
  }

  async findAll() {
    return this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: { select: { questions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { orderBy: { order: 'asc' } } },
    });

    if (!quiz) throw new NotFoundException(`Quiz #${id} not found`);

    return {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: q.options ? (JSON.parse(q.options) as string[]) : null,
      })),
    };
  }

  async remove(id: number) {
    const quiz = await this.prisma.quiz.findUnique({ where: { id } });
    if (!quiz) throw new NotFoundException(`Quiz #${id} not found`);

    await this.prisma.quiz.delete({ where: { id } });
    return { deleted: true };
  }
}
