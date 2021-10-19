import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdController, BalanceRequestController } from './prod/prod.controller';
import { ProductService, BalanceRequestService} from './prod/prodService'
// import { ProdModule } from './prod/prod.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BalanceRequest } from './entities/BalanceRequest'
import { ProdModule } from './prod/prod.modules'
import { BlockchainModule } from './blockchain/blockchain.modules'


@Module({
  imports: [ProdModule, BlockchainModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ilya',
      password: 'ilya',
      database: 'express',
      entities: [BalanceRequest],
      synchronize: true,
      })
    ],
//     controllers: [ProdController, BalanceRequestController],
//     providers: [ProductService, BalanceRequestService],
})
export class AppModule {}
