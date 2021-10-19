import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BitcoinService } from './bitcoin.service';
import { BlockchainController} from './blockchain.controller';
import { BalanceRequest } from '../entities/BalanceRequest';
import { EthereumService } from './ethereum.service'


@Module({
  imports: [TypeOrmModule.forFeature([BalanceRequest])],
  providers: [BitcoinService, EthereumService],
  controllers: [BlockchainController],
})
export class BlockchainModule {}