import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictator } from './entities/dictator.entity';
import { JwtPayload } from 'src/interface/JwtPayload';
import { CreateSlaveDto } from 'src/slaves/dto/create-slave.dto';
import { Slave } from 'src/slaves/entities/slave.entity';


@Injectable()
export class DictatorsService {
  slavesRepository: any;
  constructor(
    @InjectRepository(Dictator)
    private readonly dictatorsRepository: Repository<Dictator>,
    @InjectRepository(Slave)
    private readonly slaveRepository: Repository<Slave>,
    private jwtService: JwtService
  ) {}

  async addSlave(dictatorId: string, createSlaveDto: CreateSlaveDto) {
    const dictator = await this.dictatorsRepository.findOne({ where: { id: dictatorId } }); 
    if (!dictator) {
      throw new NotFoundException('Dictator not found');
    }
    const slave = this.slaveRepository.create(createSlaveDto);
    slave.dictator = dictator;
    return this.slaveRepository.save(slave);
  }
  async findOne(id: string): Promise<Dictator | null> {
    return this.dictatorsRepository.findOne({ where: { id } });
  }
  

  async findOneByNombre(name: string): Promise<Dictator | null> {
    return this.dictatorsRepository.findOne({ where: { name } });
  }

  async login(name: string) {
    const dictator = await this.findOneByNombre(name);

    if (!dictator) {
      throw new UnauthorizedException('Dictador no encontrado');
    }

    const payload: JwtPayload = { name: dictator.name };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async create(dictatorData: Partial<Dictator>) {
    const existingDictators = await this.dictatorsRepository.count();
    const { loyalty_to_Carolina = 50 } = dictatorData;

    const newDictator = this.dictatorsRepository.create({
      ...dictatorData,
      role: existingDictators === 0 ? 'admin' : 'dictator',
      loyalty_to_Carolina,
    });

    return this.dictatorsRepository.save(newDictator);
  }

  async findAll(): Promise<Dictator[]> {
    return this.dictatorsRepository.find();
  }

  async getSlavesOfDictator(dictatorId: string): Promise<Slave[]> {
    const dictator = await this.dictatorsRepository.findOne({
      where: { id: dictatorId },
      relations: ['slaves'], 
    });
  
    if (!dictator) {
      throw new NotFoundException('Dictator not found');
    }
  
    return dictator.slaves;
  }
}