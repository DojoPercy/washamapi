import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UsersModule, PrismaModule, CategoryModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
