/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/users.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to fetch user by email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(data: UserDto) {
    const { email, firstName, lastName, phoneNumber, imageUrl, role, gender } = data;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new HttpException(
          { message: 'User already exists', existingUser },
          HttpStatus.CONFLICT
        );
      }

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          imageUrl,
          role: role || 'user',
          gender,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, data: any) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await prisma.user.delete({ where: { id } });
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkUserExists(email: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user ? { exists: true, message: 'User exists' } : { exists: false, message: 'User does not exist' };
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to check user existence', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
