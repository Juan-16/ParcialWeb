import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { CreateDictatorDto } from './dto/create-dictator.dto';
import { AuthGuard } from '@nestjs/passport';
import { Dictator } from './entities/dictator.entity';
import { CreateSlaveDto } from 'src/slaves/dto/create-slave.dto';

@Controller('dictators')
export class DictatorsController {
  constructor(private readonly dictatorsService: DictatorsService) {}

  @Post(':id/slaves')
addSlave(
  @Param('id') dictatorId: string, 
  @Body() createSlaveDto: CreateSlaveDto
) {
  return this.dictatorsService.addSlave(dictatorId, createSlaveDto);
}

  @Post()
  create(@Body() createDictatorDto: CreateDictatorDto) {
    return this.dictatorsService.create(createDictatorDto);
  }

  @Post('login')
  login(@Body('name') name: string) {
    return this.dictatorsService.login(name);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user; //El dictador autenticado
  }

  @Get(':id/slaves')
  async getSlaves(@Param('id') dictatorId: string) {
    return this.dictatorsService.getSlavesOfDictator(dictatorId);
  }

  @Get()
  async findAll(): Promise<Dictator[]> {
    return this.dictatorsService.findAll();
  }
}