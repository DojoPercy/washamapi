import { Body, Controller, Post, UseGuards, Version, Request, Get, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post('create')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async createAddress(@Request() req: any, @Body() addressData: CreateAddressDto) {
         const userId = req.user.sub;
        return this.addressService.createAddress(userId, addressData);
    }



    @Get('getByUserId')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async getAddressByUserId(@Request() req: any) {
        const userId = req.user.sub;
        return this.addressService.getAddressByUserId(userId);
    }

    @Delete('delete')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async deleteAddress(@Request() req: any, @Body('addressId') addressId: string) {
        return this.addressService.deleteAddress(addressId);
    }

    @Put('update')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async updateAddress(@Request() req: any, @Body() addressData: CreateAddressDto) {
        const userId = req.user.sub;
        return this.addressService.updateAddress(userId, addressData);
    }


    @Get('getById')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    async getAddressById(@Request() req: any, @Body('addressId') addressId: string) {
        return this.addressService.getAddressById(addressId);
    }

   



    @Post('getByPlaceId')
    @Version('1')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')

    async getAddressByPlaceId(@Request() req: any, @Body('placeId') placeId: string) {
        return this.addressService.getAddressByPlaceId(placeId);
    }

   
}

