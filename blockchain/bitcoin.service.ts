const axios = require ( "axios" );
const bitcore = require ( "bitcore-lib" )

import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import{Repository } from 'typeorm'
import { BalanceRequest } from '../entities/BalanceRequest';

@Injectable()
export class BitcoinService {
  constructor(
    @InjectRepository(BalanceRequest)
    private balanceRequestRepository: Repository<BalanceRequest>,
  ) {}

  findOne(address: string): Promise<BalanceRequest> {
    return this.balanceRequestRepository.findOne({address}, {select:['type', 'address']});
  }

  async getBitcoinBalance(sourceAddress: string): Promise<string>{
    const getBalance = async () => {
      let totalAmountAvailable = 0
      let utxo = { "satoshis": 0 }
      const utxos = await axios.get(
        `https://sochain.com/api/v2/get_tx_unspent/BTCTEST/${sourceAddress}`
      );

      utxos.data.data.txs.forEach(async (element) => {
        utxo.satoshis = Number(element.value)
        totalAmountAvailable += utxo.satoshis
      })

      return await totalAmountAvailable
    }
    const balance= await getBalance()
    const  returnBalance = `{'type':'btc', 'address':${sourceAddress}, 'balance':${balance}}`
    return returnBalance
  }

  async create(balanceRequest:BalanceRequest): Promise <BalanceRequest> {
    const searchingAddress = balanceRequest.address
    const currentRec = await this.balanceRequestRepository.find({select:['id'], where: {address:searchingAddress} })

    if (currentRec.toString() != '') {
      const today = new Date()
      const updateDate = String(today.getDate()) + '-' + String(today.getMonth()) + '-' + String(today.getFullYear())
      this.balanceRequestRepository.delete(currentRec[0].id)
      balanceRequest.updatedAt=updateDate
      return this.balanceRequestRepository.save(balanceRequest)
    }
    else {
      return this.balanceRequestRepository.save(balanceRequest)
    }
  }
}





