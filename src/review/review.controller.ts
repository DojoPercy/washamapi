import { Body, Controller, Get, Param, Post, UseGuards, Version } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {


    constructor(private reviewService : ReviewService) {

    
    }

    @Post('submit')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async submitReview(@Body() body: ReviewDto) {
        
        return this.reviewService.submitReview(body);
    }

    @Get('get/:orderId')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async getReview(@Param('orderId') orderId: string) {
        return this.reviewService.getReview(orderId);
    }

}
