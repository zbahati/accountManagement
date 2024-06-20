import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { UserGuard } from 'src/user/user.guard';


@UseGuards(UserGuard)
@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Post('create')
    async createAccount(@Body() creaateAccountDto: CreateAccountDto, @Req() req) {
        const user = req.user.id;
        return this.accountService.createAccount(creaateAccountDto, user)
    }

    @Get('show')
    async getAccountsByUser(@Req() req) {
        const user = req.user.id;
        return this.accountService.getAccountByUser(user)
    }

    @Get('show/:id')
    async getAccount(@Param('id') id: number, @Req() req) {
        const user = req.user.id;
        return this.accountService.getAccount(id, user)
    }

    @Delete('show/:id')
    async deleteAccount(@Param('id') id: number, @Req() req) {
        const user = req.user.id
        return this.accountService.deleteAccount(id, user)
    }
}
