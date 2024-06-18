import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService){}

    @UseGuards(UserGuard)
    @Post('create')
    async createAccount(@Body() creaateAccountDto: CreateAccountDto, @Req() req){
        const user = req.user.id;
        console.log(user)
    }
}
