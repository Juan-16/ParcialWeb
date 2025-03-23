import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { Slave } from 'src/slaves/entities/slave.entity';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorsRepository: Repository<Sponsor>,
    @InjectRepository(Slave)
    private readonly slavesRepository: Repository<Slave>,
  ) {}

  async create(createSponsorDto: CreateSponsorDto): Promise<Sponsor> {
    const slave = await this.slavesRepository.findOne({
      where: { id: createSponsorDto.preferred_fighter },
    });

    if (!slave) {
      throw new NotFoundException('Preferred fighter not found');
    }

    const sponsor = this.sponsorsRepository.create({
      ...createSponsorDto,
      preferred_fighter: slave,
    });

    return this.sponsorsRepository.save(sponsor);
  }

  async findAll(): Promise<Sponsor[]> {
    return this.sponsorsRepository.find({ relations: ['preferred_fighter'] });
  }

  async findOne(id: string): Promise<Sponsor> {
    const sponsor = await this.sponsorsRepository.findOne({
      where: { id },
      relations: ['preferred_fighter'],
    });

    if (!sponsor) {
      throw new NotFoundException('Sponsor not found');
    }

    return sponsor;
  }

  async update(id: string, updateSponsorDto: UpdateSponsorDto): Promise<Sponsor> {
    const sponsor = await this.sponsorsRepository.findOne({ where: { id } });
  
    if (!sponsor) {
      throw new NotFoundException('Sponsor not found');
    }
  
    Object.assign(sponsor, updateSponsorDto);
    return this.sponsorsRepository.save(sponsor);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sponsorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Sponsor not found');
    }
  }
}