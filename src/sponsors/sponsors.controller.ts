import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { Sponsor } from './entities/sponsor.entity';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  async create(@Body() createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    return this.sponsorsService.create(createSponsorDto);
  }

  @Get()
  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sponsor> {
    return this.sponsorsService.findOne(id);
  }

  
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSponsorDto: UpdateSponsorDto,
  ): Promise<Sponsor> {
    return this.sponsorsService.update(id, updateSponsorDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.sponsorsService.remove(id);
  }
}