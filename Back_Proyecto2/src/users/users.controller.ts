import {
  Controller,
  Request,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto/users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('login')
  async postUser(@Body() body: any): Promise<any> {
    return await this.userService.findUser(body.username);
  }

  @Post('register')
  async createUser(@Body() body: UsersDto): Promise<any> {
    return await this.userService.registerUser(body);
  }
 
}
