import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, EstimateOrderDto, RescheduleOrderDto } from './dto/order.dto';
import { OrderStatus } from './types/order.types';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const {
      addressId,
      pickupDate,
      pickupSlot,
      deliveryDate,
      deliverySlot,
      specialInstructions,
      services,
    } = dto;

    let total = 0;

    // Prepare order items including bag estimates
    const orderItemsData = services.map((item) => {
      total += item.price;

      const orderItem: any = {
        serviceType: item.serviceType,
        price: item.price,
        notes: item.notes,
      };

      if (item.bagEstimate) {
        orderItem.bagEstimate = {
          create: item.bagEstimate,
        };
      }

      return orderItem;
    });

    const order = await this.prisma.order.create({
      data: {
        userId,
        addressId,
        pickupDate: new Date(pickupDate),
        pickupSlot,
        deliveryDate: new Date(deliveryDate),
        deliverySlot,
        specialInstructions,
        totalAmount: total,
        services: {
          create: orderItemsData,
        },
        history: {
          create: {
            status: 'PENDING',
            comment: 'Order placed',
          },
        },
      },
      include: {
        services: {
          include: {
            bagEstimate: true,
          },
        },
        history: true,
      },
    });

    return order;
  }

  async getOrdersByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        services: {
          include: {
            bagEstimate: true,
          },
        },
        address: true,
        history: true,
        payment: true,
        review: true,
      },
    });
  }
async updateOrderStatus(orderId: string, status: OrderStatus, comment?: string) {
const order = await this.prisma.order.update({
where: { id: orderId },
data: {
status,
history: {
create: {
status,
comment: comment,
},
},
},
});
return order;
}

  async getOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        services: {
          include: {
            bagEstimate: true,
          },
        },
        address: true,
        history: true,
        payment: true,
        review: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

   async cancelOrder(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found or not authorized');
    }
    if (order.status !== 'PENDING') {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        history: {
          create: {
            status: 'CANCELLED',
            comment: 'Cancelled by user',
          },
        },
      },
    });
  }

  async rescheduleOrder(orderId: string, userId: string, dto: RescheduleOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found or not authorized');
    }
    if (order.status !== 'PENDING' && order.status !== 'PICKUP_SCHEDULED') {
      throw new BadRequestException('Order cannot be rescheduled at this stage');
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        pickupDate: new Date(dto.pickupDate),
        pickupSlot: dto.pickupSlot,
        deliveryDate: new Date(dto.deliveryDate),
        deliverySlot: dto.deliverySlot,
        history: {
          create: {
            status: order.status,
            comment: 'Order rescheduled by user',
          },
        },
      },
    });
  }

  async getOrderStatus(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { status: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

async getOrderHistory(orderId: string) {
  const order = await this.prisma.order.findUnique({
    where: { id: orderId },
    include: {
      history: {
        orderBy: { changedAt: 'asc' },
        select: {
          status: true,
          comment: true,
          changedAt: true,
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundException('Order not found');
  }

  return order.history;
}


  async estimateOrder(dto: EstimateOrderDto) {
    let total = 0;
    dto.services.forEach(service => {
      total += service.price;
    });
    return {
      estimatedTotal: total,
      services: dto.services,
      notes: dto.specialInstructions || '',
    };
  }
}
