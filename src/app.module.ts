import { Inject, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
    useFactory: (configServie: ConfigService) => ({
      type: 'postgres',
      host: configServie.getOrThrow('HOST'),
      port: configServie.getOrThrow('PORT'),
      username: configServie.getOrThrow('USER'),
      password: configServie.getOrThrow('PASSWORD'),
      database: configServie.getOrThrow('DB'),
      autoLoadEntities: true,
      synchronize: true
    }),

    inject: [ConfigService]
  }),
    UserModule,
    AccountModule
  ],
})
export class AppModule {}
