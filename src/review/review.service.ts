import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async submitReview(ReviewDto: ReviewDto) {
    const { orderId, rating, comment } = ReviewDto;
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
  

    if (order.status !== 'COMPLETED') {
      throw new BadRequestException('Cannot review an incomplete order');
    }

    const existingReview = await this.prisma.review.findUnique({
      where: { orderId },
    });

    if (existingReview) {
      throw new BadRequestException('Review already submitted for this order');
    }

    return this.prisma.review.create({
      data: {
        orderId,
        
        rating,
        comment,
      },
    });
  }

  async getReview(orderId: string) {
    const review = await this.prisma.review.findUnique({
      where: { orderId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }


    return review;
  }
}
