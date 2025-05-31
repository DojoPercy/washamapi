import { Injectable } from '@nestjs/common';
import { addDays, startOfDay, setHours, isAfter } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlotsService {
  constructor(private prisma: PrismaService) {}

  private readonly MORNING_START = 8;
  private readonly MORNING_END = 11;
  private readonly AFTERNOON_START = 15;
  private readonly AFTERNOON_END = 17;

  private getPeriodTime(period: 'MORNING' | 'AFTERNOON', date: Date) {
    return setHours(date, period === 'MORNING' ? this.MORNING_START : this.AFTERNOON_START);
  }

  async generateWeek(weekStart: Date) {
  const slots = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);

    const morningTime = this.getPeriodTime('MORNING', date);
    const afternoonTime = this.getPeriodTime('AFTERNOON', date);

    // Only add slot if its start time is in the future
    if (isAfter(morningTime, today)) {
      slots.push({ date, period: 'MORNING' });
    }
    if (isAfter(afternoonTime, today)) {
      slots.push({ date, period: 'AFTERNOON' });
    }
  }

  // Upsert slots into DB
  for (const slot of slots) {
    await this.prisma.slot.upsert({
      where: {
        date_period: {
          date: startOfDay(slot.date),
          period: slot.period,
        },
      },
      update: {},
      create: {
        date: startOfDay(slot.date),
        period: slot.period,
        status: 'AVAILABLE',
      },
    });
  }

  return slots;
}


  async getByDate(date: Date) {
    return this.prisma.slot.findMany({
      where: {
        date: startOfDay(date),
        status: { not: 'BLOCKED' },
      },
      orderBy: { period: 'asc' },
    });
  }

  async blockSlot(id: string) {
    return this.prisma.slot.update({
      where: { id },
      data: { status: 'BLOCKED' },
    });
  }

  async bookSlot(id: string) {
    return this.prisma.slot.update({
      where: { id },
      data: { status: 'BOOKED' },
    });
  }
}
