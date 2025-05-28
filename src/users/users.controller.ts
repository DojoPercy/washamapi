
import { Controller, Get, Post, Put, Delete, Param, Body, Version, Request, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCleaningPreferencesDto } from './dto/pref.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Version('1') // Version 1 route for fetching all users
  async getAllUsers() {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
  @Get('preferences')
  @Version('1')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async getUserPreferences(@Request() req) {
    try {
      const userId = req.user.sub;
      console.log('Fetching preferences for user ID:', userId);
      const preferences = await this.userService.getUserPreferences(userId);
      return preferences;
    } catch (error) {
      throw error;
    }
  }

   @Put('preferences')
  @Version('1')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async updateUserPreferences(@Request() req, @Body() preferencesDto: CreateCleaningPreferencesDto) {
    try {
      const userId = req.user.sub;
      const updatedPreferences = await this.userService.updateUserPreferences(userId, preferencesDto);
      return updatedPreferences;
    } catch (error) {
      throw error;
    }
  }
  @Get(':id')
  @Version('1') // Version 1 route for fetching a user by ID
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get('email/:email')
  @Version('1') // Version 1 route for fetching a user by email
  async getUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @Version('1') // Version 1 route for creating a new user
  async createUser(@Body() userDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(userDto);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @Version('1') // Version 1 route for updating an existing user
  async updateUser(@Param('id') id: string, @Body() data: any) {
    try {
      const updatedUser = await this.userService.updateUser(id, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @Version('1') // Version 1 route for deleting a user
  async deleteUser(@Param('id') id: string) {
    try {
      const response = await this.userService.deleteUser(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Get('check-email/:email')
  @Version('1') // Version 1 route to check if a user exists by email
  async checkUserExists(@Param('email') email: string) {
    try {
      const result = await this.userService.checkUserExists(email);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Post('preferences')
  @Version('1') 
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  async createUserPreferences(@Request() req, @Body() preferencesDto: CreateCleaningPreferencesDto) {
    try {
      const userId = req.user.sub;
      const preferences = await this.userService.createUserPreferences(userId, preferencesDto);
      return preferences;
    } catch (error) {
      throw error;
    }
  }

 



}
