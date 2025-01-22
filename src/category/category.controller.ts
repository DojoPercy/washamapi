/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Prisma } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() data: Prisma.CategoryCreateInput) {
    return this.categoryService.createCategory(data);
  }

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() data: Prisma.CategoryUpdateInput) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
