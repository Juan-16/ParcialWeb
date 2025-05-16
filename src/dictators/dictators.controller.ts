import { Controller, Post, Body, Get, UseGuards, Request, Param,Delete } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { CreateDictatorDto } from './dto/create-dictator.dto';
import { AuthGuard } from '@nestjs/passport';
import { Dictator } from './entities/dictator.entity';
import { CreateSlaveDto } from 'src/slaves/dto/create-slave.dto';
import { LoginDto } from './dto/login.dto';
import { SlavesService } from 'src/slaves/slaves.service'; // Ajusta la ruta 

@Controller('dictators')
export class DictatorsController {
  constructor(
    private readonly dictatorsService: DictatorsService,
    private readonly slavesService: SlavesService, // <-- Aquí lo agregas
  ) {}

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
async login(@Body() loginDto: LoginDto) {
  return this.dictatorsService.login(loginDto.name, loginDto.password);
}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user; //El dictador autenticado
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictatorsService.findOne(id);
  }

  @Get(':id/slaves')
  async getSlaves(@Param('id') dictatorId: string) {
    return this.dictatorsService.getSlavesOfDictator(dictatorId);
  }

  @Delete(':id')
  async deleteDictator(@Param('id') id: string): Promise<void> {
    await this.dictatorsService.delete(id);  // Llamada al servicio para eliminar el dictador
  }

  @Post(':dictatorId/assign-slave/:slaveId')
  assignSlave(@Param('dictatorId') dictatorId: string, @Param('slaveId') slaveId: string) {
    return this.dictatorsService.assignSlave(dictatorId, slaveId);
  }

  @Get()
  async findAll(): Promise<Dictator[]> {
    return this.dictatorsService.findAll();
  }

  
}