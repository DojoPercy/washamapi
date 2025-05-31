import { Controller, Get, Query, Param, Patch, Post, UseGuards, Version } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('slots')
export class SlotsController {
  constructor(private slotService: SlotsService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Version('1')
  @Get('generate-week')
  generateWeek(@Query('weekStart') weekStart: string) {
    return this.slotService.generateWeek(new Date(weekStart));
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Version('1')
  @Get()
  getByDate(@Query('date') date: string) {
    return this.slotService.getByDate(new Date(date));
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Version('1')
  @Patch(':id/block')
  blockSlot(@Param('id') id: string) {
    return this.slotService.blockSlot(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Version('1')
  @Post(':id/book')
  bookSlot(@Param('id') id: string) {
    return this.slotService.bookSlot(id);
  }
}
