/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(createItemDto: CreateItemDto) {
    const { name, avgWeight, categoryId } = createItemDto;

    return this.prisma.item.create({
      data: {
        name,
        avgWeight,
        category: {
          connect: {
            id: categoryId, 
          },
        },
      },
    });
  }

  async getAllItems() {
    return this.prisma.item.findMany({ include: { category: true } });
  }

  async getItemById(id: string) {
    return this.prisma.item.findUnique({ where: { id }, include: { category: true } });
  }

  async updateItem(id: string, data: Prisma.ItemUpdateInput) {
    return this.prisma.item.update({ where: { id }, data });
  }

  async deleteItem(id: string) {
    return this.prisma.item.delete({ where: { id } });
  }
}
