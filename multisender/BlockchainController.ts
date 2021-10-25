import { Controller, Body, Post, HttpCode, Header, Get } from '@nestjs/common';
import {EthereumService} from "./EthereumService";
import {SendTxDto} from "./dto/SendTx-dto";
import {BlockchainEntity} from "../../bd/src/entity/BlockchainEntity";
import { UsdtService } from './UsdtService'

@Controller()
export class BlockchainController {
    constructor(private readonly ethereumService: EthereumService,
                private readonly usdtService: UsdtService) {}

    @Post('sendTx')
    async sendTx( @Body () sendTxDto:SendTxDto) {
      if (sendTxDto.type=='eth')
        {return this.ethereumService.sendTx(sendTxDto.send )}
    }

  @Post('sendUSDT')
  async sendUSDT( @Body () sendTxDto:SendTxDto) {
    if (sendTxDto.type=='eth')
    {return this.usdtService.sendTx(sendTxDto)}
  }
}
