/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMoodDto } from './dto/create-mood.dto';
import { UpdateMoodDto } from './dto/update-mood.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MoodsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MoodCreateInput) {
    return await this.prisma.mood.create({ data });
  }

  async findAll() {
    return await this.prisma.mood.findMany();
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

  // update(id: number, updateMoodDto: UpdateMoodDto) {
  //   return `This action updates a #${id} mood`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mood`;
  // }
}
