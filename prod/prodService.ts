import {Injectable} from '@nestjs/common'
import {CreateProductDto} from './dto/create-prod.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceRequest } from '../entities/BalanceRequest';



@Injectable()
export class ProductService{
  private prods=[]

  getAll(){
    return this.prods
  }

  getById(name:string){
    this.prods.find(p=>{
       p===name
    })
    const a= this.prods.includes(name)
    return  a
  }

  create(productDto: CreateProductDto){
    this.prods.push ({
    ...productDto,
    id:Date.now().toString()
    })
  }
}

@Injectable()
export class BalanceRequestService {
  constructor(
    @InjectRepository(BalanceRequest)
    private balanceRequestRepository: Repository<BalanceRequest>,
  ) {}

  findAll(): Promise<BalanceRequest[]> {
    return this.balanceRequestRepository.find();
  }

  findOne(id: string): Promise<BalanceRequest> {
    return this.balanceRequestRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.balanceRequestRepository.delete(id);
  }
}