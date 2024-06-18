import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entity/user.entity';
import { Request, Response } from 'express';
import { UserGuard } from './user.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('register')
    async registration(@Body() createUserDto: CreateUserDto): Promise<UserEntity>{
        return this.userService.registration(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response): Promise<string>{
        return this.userService.login(loginUserDto, response)
    }

    @UseGuards(UserGuard)
    @Get('profile')
    async getUser(@Req() request: Request){
      return this.userService.getUser(request)
    }

    @UseGuards(UserGuard)
    @Get('current')
    async getCurrent(@Req() req){
        return req.user.email;
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response ){
        return this.userService.logout(response)
    }
}
