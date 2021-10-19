import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService, BalanceRequestService } from './prodService';
import { ProdController, BalanceRequestController } from './prod.controller';
import { BalanceRequest } from '../entities/BalanceRequest';


@Module({
  imports: [TypeOrmModule.forFeature([BalanceRequest])],
  providers: [ProductService, BalanceRequestService],
  controllers: [ProdController, BalanceRequestController],
})
export class ProdModule {}