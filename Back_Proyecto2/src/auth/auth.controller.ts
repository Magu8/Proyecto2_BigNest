import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/users/dto/users.dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
   async register(@Body() usersDto: UsersDto, @Res() res){
        const result = await this.authService.register(usersDto);
        return res.status(result.status).json({message: result.message})
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() userData: {username: string, password: string}): Promise <any> {
        return await this.authService.login(req.user)
    }
}
