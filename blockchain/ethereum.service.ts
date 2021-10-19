const Web3 = require('web3')
const web3 = new Web3("https://ropsten.infura.io/v3/672b38a3e2d746f5bd5f24396cb048e9");


import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import CreateBalancerecDto from './dto/create.balance.record.dto'
import { BalanceRequest } from '../entities/BalanceRequest';

@Injectable()
export class EthereumService {
  constructor(
    @InjectRepository(BalanceRequest)
    private balanceRequestRepository: Repository<BalanceRequest>,
  ) {}

  async getEthereumBalance(address: string): Promise<string> {
    const validAdd = web3.utils.isAddress(address)
    if (validAdd != true) {
      return 'Wrong address!'
    }
    else {
      let balance = await web3.eth.getBalance(address)
      balance = balance / Math.pow(10, 18)
      const returnBal = String(balance)
      const data = `{'type':'eth', 'address':${address}, 'balance':${returnBal}}`
      return data
    }
  }
}