import {Res, Req,  Ip, HttpCode, Header, HttpStatus, Controller, Get , Param, Post, Delete, Body, Put} from '@nestjs/common';
import {Request, Response} from 'express'
import {BitcoinService} from './bitcoin.service'
import {EthereumService} from './ethereum.service'
import CreateBalanceDto  from './dto/create.balance.record.dto'
import { BalanceRequest } from '../entities/BalanceRequest';
import { createParamDecorator } from '@nestjs/common';
import * as requestIp from 'request-ip';

@Controller()
export class BlockchainController {
  constructor(
    private readonly bitcoinBalance: BitcoinService, private readonly ethereumBalance: EthereumService) {}

  @Get('data/:type/balance/:address')
  findOne(@Param('type') type, @Param('address') address) {
    return this.bitcoinBalance.findOne(address)
  }

  @Get(':type/balance/:address')
  async getbitcoinBalance(@Param('type') type, @Param('address') address, @Req() req: Request): Promise<string> {
    if (type == 'btc') {
      return this.bitcoinBalance.getBitcoinBalance(address)
    }
    if (type == 'eth') {
      const result = await this.ethereumBalance.getEthereumBalance(address)
      const balanceRequest = new BalanceRequest()
      balanceRequest.ip = req.ip
      balanceRequest.address = address
      balanceRequest.type = type
      balanceRequest.result = result
      let today = new Date()
      balanceRequest.createdAt = String(today.getDate()) + '-' + String(today.getMonth()) + '-' + String(today.getFullYear())
      this.bitcoinBalance.create(balanceRequest)
      return result
    }
  }
}
