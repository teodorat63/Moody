import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MoodsService } from './moods.service';
import { UpdateMoodDto, CreateMoodDto } from './dto';

@Controller('moods')
export class MoodsController {
  constructor(private readonly moodsService: MoodsService) {}

  @Post()
  create(@Body() dto: CreateMoodDto) {
    return this.moodsService.create(dto);
  }

  @Get()
  findAll() {
    return this.moodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moodsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMoodDto) {
    return this.moodsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moodsService.remove(id);
  }

  @Get(':moodId/songs')
  findSongs(@Param('moodId') moodId: number) {
    return this.moodsService.findSongs(+moodId);
  }
}
