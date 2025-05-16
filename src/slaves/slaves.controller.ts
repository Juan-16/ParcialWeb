import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlavesService } from './slaves.service';
import { CreateSlaveDto } from './dto/create-slave.dto';
import { UpdateSlaveDto } from './dto/update-slave.dto';
import { Slave } from 'src/slaves/entities/slave.entity';
@Controller('slaves')
export class SlavesController {
  constructor(private readonly slavesService: SlavesService) {}

  @Post()
  create(@Body() createSlaveDto: CreateSlaveDto) {
    return this.slavesService.create(createSlaveDto);
  }

  @Patch(':id/status')
updateStatus(@Param('id') id: string, @Body('status') status: string) {
  return this.slavesService.updateStatus(id, status);
}

  @Get()
  findAll() {
    return this.slavesService.findAll();
  }

     @Get('unassigned')
    async getUnassigned(): Promise<Slave[]> {
      return this.slavesService.findUnassigned();
    }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.slavesService.findOne(id);
}
@Patch(':id')
update(@Param('id') id: string, @Body() updateSlaveDto: UpdateSlaveDto) {
  return this.slavesService.update(id, updateSlaveDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.slavesService.remove(id);
}
}
