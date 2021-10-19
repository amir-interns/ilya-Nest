import {Res, Req,  HttpCode, Header, HttpStatus, Controller, Get , Param, Post, Delete, Body, Put} from '@nestjs/common';
import {CreateProductDto, UpdateProductDto} from './dto/create-prod.dto'
import {Request, Response} from 'express'
import {ProductService, BalanceRequestService} from './prodService'


@Controller('bd')
export class BalanceRequestController {
  constructor (private readonly balanceRequest: BalanceRequestService){}

  @Get()
  findAll() {
  console.log('0asd')
    return this.balanceRequest.findAll()
    }
}


@Controller('prod')
export class ProdController {
  constructor (private readonly prodServ: ProductService){}

  @Get()
  getAll() {
    return this.prodServ.getAll()
    }

  @Get(':name')
  getById(@Param('name') name){
    return this.prodServ.getById(name)
  }


//   @Get(':id')
//   getOne(@Param('id') id){
//     return 'getOne' + id
//   }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control','none')
  create(@Body() createProdDto: CreateProductDto){
     return this.prodServ.create(createProdDto)
  }

  @Delete(':id')
  delete(@Param('id') id){
    return 'Del'+ id
  }

  @Put(':id')
  update(@Body() updateProdDto: UpdateProductDto, @Param('id') id:string){
    return 'Update' + id
  }
}



