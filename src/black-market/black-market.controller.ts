import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { BlackMarketService } from './black-market.service';
import { CreateBlackMarketDto } from './dto/create-black-market.dto';
import { UpdateBlackMarketDto } from './dto/update-black-market.dto';

@Controller('black-market')
export class BlackMarketController {
  constructor(private readonly blackMarketService: BlackMarketService) {}

  
  @Post()
  async create(@Body() createBlackMarketDto: CreateBlackMarketDto) {
    return this.blackMarketService.create(createBlackMarketDto);
  }

  
  @Get()
  async findAll() {
    return this.blackMarketService.findAll();
  }

 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blackMarketService.findOne(id);
  }

  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlackMarketDto: UpdateBlackMarketDto) {
    return this.blackMarketService.update(id, updateBlackMarketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.blackMarketService.remove(id);
}
}