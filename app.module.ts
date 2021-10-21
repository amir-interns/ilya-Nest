import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BalanceRequest } from './entities/BalanceRequest'
import { ProdModule } from './prod/prod.modules'
import { BlockchainModule } from './blockchain/blockchain.modules'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.username,
      password: process.env.password,
      database: process.env.database,
      entities: [BalanceRequest],
      synchronize: true,
    }),
    ProdModule,
    BlockchainModule,
    UsersModule,
  ],
})
export class AppModule {}
