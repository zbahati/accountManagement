import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entity/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountType } from './account.enum';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountEntityRepository: Repository<AccountEntity>
    ) { }

    async createAccount(createAccountDto: CreateAccountDto, user: any) {
        const newAccount = new AccountEntity({ ...createAccountDto, accountType: AccountType.SAVING, user: user })
        if (!newAccount) {
            throw new BadRequestException()
        }

        const account = await this.accountEntityRepository.save(newAccount)
        return account
    }

    async getAccountByUser(user: any): Promise<AccountEntity[]> {
        const account = await this.accountEntityRepository.find({
            where: {
                user: {
                    id: user
                }
            }
        });
        return account;
    }
    async getAccount(id: number, user: any) {
        const checkId = await this.accountEntityRepository.findOne({ where: { id: id } });
        if (!checkId) {
            throw new NotFoundException()
        }

        const account = await this.accountEntityRepository.findOne({
            where: {
                id: id,
                user: {
                    id: user
                }
            }
        })

        if (!account) {
            throw new NotFoundException()
        }

        return account
    }

    async deleteAccount(id: number, user: any): Promise<string> {
        const checkId = await this.getAccount(id, user);
        if (!checkId) {
            throw new NotFoundException()
        }

        const deleteAccount = await this.accountEntityRepository.delete(checkId.id)
        if (!deleteAccount) {
            throw new HttpException(`Account with ID #${checkId.id} not deleted`, HttpStatus.BAD_REQUEST)
        }
        
        return `Account with ID # ${checkId.id}, successfully deleted.`
    }
}
