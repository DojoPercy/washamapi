import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto, EstimateOrderDto, RescheduleOrderDto, UpdateOrderDto } from './dto/order.dto';

@Controller('orders')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async create(@Request() req, @Body() dto: CreateOrderDto) {
    const userId = req.user.sub;
    return this.orderService.createOrder(userId, dto);
  }

  @Get()
  async findMyOrders(@Request() req) {
    const userId = req.user.sub;
    return this.orderService.getOrdersByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Put()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async updateOrderFunc(@Body() order:UpdateOrderDto)
{
    const { id, status , comment} = order;
    return this.orderService.updateOrderStatus(id, status, comment);
}
@ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
 @Put(':id/cancel')
  async cancel(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.orderService.cancelOrder(id, userId);
  }
@ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Put(':id/reschedule')
  async reschedule(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: RescheduleOrderDto,
  ) {
    const userId = req.user.sub;
    return this.orderService.rescheduleOrder(id, userId, dto);
  }
@ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get(':id/status')
  async getStatus(@Param('id') id: string) {
    return this.orderService.getOrderStatus(id);
  }
@ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get(':id/history')
  async getHistory(@Param('id') id: string) {
    return this.orderService.getOrderHistory(id);
  }
@ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('estimate')
  async estimate(@Body() dto: EstimateOrderDto) {
    return this.orderService.estimateOrder(dto);
  }

}
