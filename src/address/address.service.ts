import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {

       
    }
 async createAddress(userId: string, addressData: CreateAddressDto) {

    try{
        if (!userId || !addressData) {
            throw new InternalServerErrorException('User ID and address data are required');    }
        if (!addressData.placeId || !addressData.label) {
            throw new InternalServerErrorException('Place ID and label are required');
        }
        const {placeId, label, description} = addressData;
        const address = await this.prisma.address.create({
            data: {
                placeId,
                label,
                description,
                userId, 
            },
        });
        return address;




    } catch (error) {
        console.error('Error creating address:', error);
        throw new InternalServerErrorException();;
    }
        }


    async getAddressByUserId(userId: string) {
        try {
            if (!userId) {
                throw new InternalServerErrorException('User ID is required');
            }
            const addresses = await this.prisma.address.findMany({
                where: { userId },
            });
            return addresses;
        } catch (error) {
            console.error('Error fetching addresses:', error);
            throw new InternalServerErrorException();
        }
    }

    async deleteAddress(addressId: string) {
        try {
            if (!addressId) {
                throw new InternalServerErrorException('Address ID is required');
            }
            const address = await this.prisma.address.delete({
                where: { id: addressId },
            });
            return address;
        } catch (error) {
            console.error('Error deleting address:', error);
            throw new InternalServerErrorException();
        }
    }

    async updateAddress(addressId: string, addressData: CreateAddressDto) {
        try {
            if (!addressId || !addressData) {
                throw new InternalServerErrorException('Address ID and data are required');
            }
            const { placeId, label, description } = addressData;
            const address = await this.prisma.address.update({
                where: { id: addressId },
                data: {
                    placeId,
                    label,
                    description,
                },
            });
            return address;
        } catch (error) {
            console.error('Error updating address:', error);
            throw new InternalServerErrorException();
        }
    }

    async getAddressById(addressId: string) {
        try {
            if (!addressId) {
                throw new InternalServerErrorException('Address ID is required');
            }
            const address = await this.prisma.address.findUnique({
                where: { id: addressId },
            });
            return address;
        } catch (error) {
            console.error('Error fetching address by ID:', error);
            throw new InternalServerErrorException();
        }
    }


    async getAllAddresses() {
        try {
            const addresses = await this.prisma.address.findMany();
            return addresses;
        } catch (error) {
            console.error('Error fetching all addresses:', error);
            throw new InternalServerErrorException();
        }
    }


    async getAddressByPlaceId(placeId: string) {
        try {
            if (!placeId) {
                throw new InternalServerErrorException('Place ID is required');
            }
            const address = await this.prisma.address.findUnique({
                where: { placeId },
            });
            return address;
        } catch (error) {
            console.error('Error fetching address by Place ID:', error);
            throw new InternalServerErrorException();
        }
    }


  


    async getAddressByUserIdAndPlaceId(userId: string, placeId: string) {
        try {
            if (!userId || !placeId) {
                throw new InternalServerErrorException('User ID and Place ID are required');
            }
            const address = await this.prisma.address.findFirst({
                where: {
                    userId,
                    placeId,
                },
            });
            return address;
        } catch (error) {
            console.error('Error fetching address by user ID and Place ID:', error);
            throw new InternalServerErrorException();
        }
    }

}
