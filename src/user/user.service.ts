/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/auth/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // READ ALL (omit password in responses)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        // omit password
      },
      orderBy: { id: 'asc' },
    });
  }

  // READ ONE
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  // UPDATE
  async update(id: number, data: UpdateUserDto) {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: {
          ...(data.name !== undefined ? { name: data.name } : {}),
          ...(data.email !== undefined ? { email: data.email } : {}),
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      return updated;
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE
  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }

  async updateUserMood(userId: number, moodId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const mood = await this.prisma.mood.findUnique({ where: { id: moodId } });
    if (!mood) throw new NotFoundException('Mood not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        moods: {
          connect: { id: moodId },
        },
      },
    });
  }

  async getUsersByMood(moodId: number) {
    return this.prisma.user.findMany({
      where: {
        moods: {
          some: { id: moodId },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
