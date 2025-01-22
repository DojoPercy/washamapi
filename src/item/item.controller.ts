/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ItemService } from './item.service';
import { Prisma } from '@prisma/client';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  createItem(@Body() data: Prisma.ItemCreateInput) {
    return this.itemService.createItem(data);
  }

  @Get()
  getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: string) {
    return this.itemService.getItemById(id);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() data: Prisma.ItemUpdateInput) {
    return this.itemService.updateItem(id, data);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(id);
  }
}
