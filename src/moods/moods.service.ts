import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMoodDto, UpdateMoodDto } from './dto';

@Injectable()
export class MoodsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateMoodDto) {
    return this.prisma.mood.create({ data: dto });
  }

  findAll() {
    return this.prisma.mood.findMany({
      orderBy: { id: 'asc' },
      include: { _count: { select: { songs: true } } },
    });
  }

  async findOne(id: number) {
    const mood = await this.prisma.mood.findUnique({
      where: { id },
      // include: { users: true, songs: true },
    });
    if (!mood) throw new NotFoundException(`Mood ${id} not found`);
    return mood;
  }

  async update(id: number, dto: UpdateMoodDto) {
    try {
      return await this.prisma.mood.update({
        where: { id },
        data: dto as Prisma.MoodUpdateInput,
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.mood.delete({ where: { id } });
      return { success: true };
    } catch (e: any) {
      console.log(e);
    }
  }

  async findSongs(moodId: number) {
    return await this.prisma.song.findMany({
      where: {
        moods: {
          some: {
            id: moodId,
          },
        },
      },
    });
  }
}
