import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseEnumPipe,

} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { CreatePriceDto, PriceCategory, UpdatePriceDto } from './dto/pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  getAllPrices() {
    return this.pricingService.getAllPrices();
  }

  @Get('category/:category')
  getPricesByCategory(
    @Param('category', new ParseEnumPipe(PriceCategory)) category: PriceCategory,
  ) {
    return this.pricingService.getPricesByCategory(category);
  }

  @Post()
  createPrice(@Body() dto: CreatePriceDto) {
    return this.pricingService.createPrice(dto);
  }

  @Put(':id')
  updatePrice(@Param('id') id: string, @Body() dto: UpdatePriceDto) {
    return this.pricingService.updatePrice(id, dto);
  }

  @Delete(':id')
  deletePrice(@Param('id') id: string) {
    return this.pricingService.deletePrice(id);
  }
}
