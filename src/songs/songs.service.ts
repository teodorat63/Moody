import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSongDto, UpdateSongDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSongDto) {
    return this.prisma.song.create({ data: dto });
  }

  findAll() {
    return this.prisma.song.findMany({
      orderBy: { id: 'asc' },
      // include: { moods: true },
    });
  }

  async findOne(id: number) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      // include: { moods: true },
    });
    if (!song) throw new NotFoundException(`Song ${id} not found`);
    return song;
  }

  async update(id: number, dto: UpdateSongDto) {
    try {
      return await this.prisma.song.update({
        where: { id },
        data: dto as Prisma.SongUpdateInput,
      });
    } catch (e: any) {
      console.log(e);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.song.delete({ where: { id } });
      return { success: true };
    } catch (e: any) {
      console.log(e);
    }
  }
}
