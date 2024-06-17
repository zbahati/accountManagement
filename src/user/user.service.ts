import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>
    ) { }

    async registration(createUserDto: CreateUserDto): Promise<UserEntity>{
        const checkEmail = await this.findOne(createUserDto.email);
        if(checkEmail){
            throw new HttpException('User email already taken', HttpStatus.FOUND);
        }

        const hashPassword = hashSync(createUserDto.password, 16);

        const newUser = new UserEntity({...createUserDto, password: hashPassword});
        if(!newUser){
            throw new BadRequestException();
        }

        const user = await this.userEntityRepository.save(newUser)
        return user;
    }

    private async findOne(email: string): Promise<UserEntity>{
        const user = await this.userEntityRepository.findOne({where: {email: email}})
        return user
    }
}
