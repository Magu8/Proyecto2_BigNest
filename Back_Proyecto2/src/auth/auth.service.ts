import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDto } from 'src/users/dto/users.dto/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register(usersDto: UsersDto) {
    return await this.usersService.registerUser(usersDto);
  }

  async validateUser(username: string, pass: string): Promise<any> {

    const user = await this.usersService.findUser(username);
    console.log(user);
    
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payLoad = {username: user.username, sub: user.userId}

    return {
      access_token: this.jwtService.sign(payLoad)
    }
  }

  // async generateToken(user: any): Promise<string> {
  //   const tokenPayload = { username: user.username };
  //   const token = this.jwtService.sign(tokenPayload);

  //   const newToken = new TokenModel({})
  //   return
  // }

}
