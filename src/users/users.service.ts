
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCleaningPreferencesDto } from './dto/pref.dto';



@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
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
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to fetch user by email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(data: CreateUserDto) {
    const { email, firstName, lastName, phoneNumber, role, gender, password } = data;

    try {
      if (!email || !firstName || !lastName || !password) {
        throw new HttpException({
          message: 'Missing Reuired fields', 
        }, HttpStatus.BAD_REQUEST);
      }
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      const existingPhoneNumber = await this.prisma.user.findUnique({ where: { phoneNumber } });
      if (existingUser ) {
        throw new HttpException(
          { message: 'User already exists', existingUser },
          HttpStatus.CONFLICT
        );
      }
      if(existingPhoneNumber){
        throw new HttpException(
          { message: 'Phone number already exists', existingPhoneNumber },
          HttpStatus.CONFLICT
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        throw new HttpException('Failed to hash password', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const newUser = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          role: role || 'user',
          gender,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(`${error} , Failed to create`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: string, data: any) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await this.prisma.user.update({
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
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.user.delete({ where: { id } });
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
      const user = await this.prisma.user.findUnique({ where: { email } });
      return user ? { exists: true, message: 'User exists' } : { exists: false, message: 'User does not exist' };
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to check user existence', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async checkUserPhoneNumber(phoneNumber: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { phoneNumber } });
      
      return user ? { exists: true, message: 'User exists' } : { exists: false, message: 'User does not exist' };
    } catch (error) {
        console.log(error);
      throw new HttpException('Failed to fetch user by phone number', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async createUserPreferences(userId: string, preferences: CreateCleaningPreferencesDto) {
    try {

      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userPreferences = await this.prisma.cleaningPreferences.create({
        data: {
          userId,
          detergentType: preferences.detergentType,
          fabricSoftener: preferences.fabricSoftener,
          oxiclean: preferences.oxiclean,
          starchLevel: preferences.starchLevel,
          dryingMethod: preferences.dryingMethod,
          specialNotes: preferences.specialNotes,

        },
      });

      return userPreferences;
    
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to create user preferences', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserPreferences(userId: string) {
    try {
      

      const preferences = await this.prisma.cleaningPreferences.findUnique({
        where: { userId },
      });

      if (!preferences) {
        throw new NotFoundException('Preferences not found for this user');
      }

      return preferences;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to fetch user preferences', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserPreferences(userId: string, preferences: CreateCleaningPreferencesDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updatedPreferences = await this.prisma.cleaningPreferences.update({
        where: { userId },
        data: {
          detergentType: preferences.detergentType,
          fabricSoftener: preferences.fabricSoftener,
          oxiclean: preferences.oxiclean,
          starchLevel: preferences.starchLevel,
          dryingMethod: preferences.dryingMethod,
          specialNotes: preferences.specialNotes,
        },
      });

      return updatedPreferences;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to update user preferences', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
