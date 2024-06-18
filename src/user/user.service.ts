import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync, compareSync } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtSecret } from './contants';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async registration(createUserDto: CreateUserDto): Promise<UserEntity> {
        const checkEmail = await this.findOne(createUserDto.email);
        if (checkEmail) {
            throw new HttpException('User email already taken', HttpStatus.FOUND);
        }

        const hashPassword = hashSync(createUserDto.password, 16);

        const newUser = new UserEntity({ ...createUserDto, password: hashPassword });
        if (!newUser) {
            throw new BadRequestException();
        }

        const user = await this.userEntityRepository.save(newUser)
        return user;
    }

    async login(loginUserDto: LoginUserDto, response: Response): Promise<string> {
        const user = await this.findOne(loginUserDto.email);
        if (!user) {
            throw new UnauthorizedException()
        }

        const password = compareSync(loginUserDto.password, user.password)

        if (!password) {
            throw new UnauthorizedException()
        }
        delete user.password

        const payload = { sub: user.id, email: user.email }
        const access_token = await this.jwtService.signAsync(payload)
        response.cookie('jwt', access_token)
        return "User is successfully logged in"
    }

    async getUser(request: Request): Promise<UserEntity> {
        const token = request.cookies['jwt'];
        
        if (!token) {
            throw new ForbiddenException()
        }

        const userProfile =await this.jwtService.verifyAsync(token, { secret: JwtSecret.secret })

        if (!userProfile) {
            throw new UnauthorizedException()
        }

        const data = await this.userEntityRepository.findOne({where: {id: userProfile["sub"]}})
        delete data.password
        return data;
    }

    async logout(response: Response){
        response.clearCookie('jwt');
        return 'logout successfully.'
    }
    
    private async findOne(email: string): Promise<UserEntity> {
        const user = await this.userEntityRepository.findOne({ where: { email: email } })
        return user
    }
}
