/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit , OnModuleDestroy {
    onModuleInit() {
        this.$connect().then(( )=> {
            console.log('Database connected')
        }).catch((err) => {
            console.log(err)
        })
    }
    async onModuleDestroy() {
        await this.$disconnect();
      }
}
