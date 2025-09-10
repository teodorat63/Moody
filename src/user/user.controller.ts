/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Mood, User } from '@prisma/client';
import { UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth('bearer')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //GET /users/me
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  // GET /users
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // PATCH /users/:id
  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':userId/mood/:moodId')
  async updateUserMood(
    @Param('userId') userId: string,
    @Param('moodId') moodId: string,
  ) {
    const updated = await this.userService.updateUserMood(+userId, +moodId);

    if (updated) {
      return { message: 'Mood successfully updated' };
    } else {
      return { message: 'Failed to update mood' };
    }
  }

  @Get(':moodId/users')
  getUsersByMood(@Param('moodId', ParseIntPipe) moodId: number) {
    return this.userService.getUsersByMood(moodId);
  }
}
