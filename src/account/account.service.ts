import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountType } from './account.enum';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountEntityRepository: Repository<AccountEntity>
    ){}

    async createAccount(createAccountDto: CreateAccountDto, user){
        const newAccount = new AccountEntity({...createAccountDto, accountType: AccountType.SAVING, user: user})
        if(!newAccount){
            throw new BadRequestException()
        }
        
        const account = await this.accountEntityRepository.save(newAccount)
        return account
    }
}
