
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePriceDto, PriceCategory, UpdatePriceDto } from "./dto/pricing.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPrices() {
    return this.prisma.price.findMany();
  }

  async getPricesByCategory(category: PriceCategory) {
    return this.prisma.price.findMany({ where: { category } });
  }

  async createPrice(data: CreatePriceDto) {
    return this.prisma.price.create({ data });
  }

  async updatePrice(id: string, data: UpdatePriceDto) {
    return this.prisma.price.update({ where: { id }, data });
  }

  async deletePrice(id: string) {
    return this.prisma.price.delete({ where: { id } });
  }
}
