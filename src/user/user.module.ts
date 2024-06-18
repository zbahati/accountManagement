import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecret } from './contants';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),JwtModule.register({
    secret: JwtSecret.secret,
    global: true,
    signOptions: {
      expiresIn: '1d'
    }, 

  }),],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
