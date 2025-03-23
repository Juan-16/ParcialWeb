import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  async create(@Body() { dictatorId, ...createBattleDto }: { dictatorId: string } & CreateBattleDto) {
    return await this.battlesService.create(dictatorId, createBattleDto);
  }

  @Get()
  async findAll() {
    return await this.battlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.battlesService.findOne(id); 
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBattleDto: UpdateBattleDto) {
    return await this.battlesService.update(id, updateBattleDto); 
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.battlesService.remove(id); 
  }
}