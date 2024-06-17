import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entity/user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('register')
    async registration(@Body() createUserDto: CreateUserDto): Promise<UserEntity>{
        return this.userService.registration(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response): Promise<{token: string,user: UserEntity;
    }>{
        return this.userService.login(loginUserDto, response)
    }
}
