import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,IsNull } from 'typeorm';
import { Dictator } from './entities/dictator.entity';
import { JwtPayload } from 'src/interface/JwtPayload';
import { CreateSlaveDto } from 'src/slaves/dto/create-slave.dto';
import { Slave } from 'src/slaves/entities/slave.entity';
import * as bcrypt from 'bcrypt';


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

  async assignSlave(dictatorId: string, slaveId: string) {
    const dictator = await this.dictatorsRepository.findOne({ where: { id: dictatorId } });
    if (!dictator) {
      throw new NotFoundException('Dictator not found');
    }
  
    const slave = await this.slaveRepository.findOne({ where: { id: slaveId } });
    if (!slave) {
      throw new NotFoundException('Slave not found');
    }
  
    slave.dictator = dictator;
    return this.slaveRepository.save(slave);
  }
  
  

  async findOneByNombre(name: string): Promise<Dictator | null> {
    return this.dictatorsRepository.findOne({ where: { name } });
  }

  
  async login(name: string, password: string) {
    const dictator = await this.dictatorsRepository.findOne({ where: { name } });
  
    if (!dictator) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, dictator.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Asignar un valor por defecto a role si es undefined
    const role = dictator.role || 'dictator';  // Valor por defecto 'dictator'
  
    // Crear el payload para el token
    const payload: JwtPayload = { 
      name: dictator.name,
      role: role  // Usamos el valor por defecto aquí si 'role' es undefined
    };
  
    // Generar el token JWT
    const token = this.jwtService.sign(payload);
  
    return {
      message: 'Login successful',
      token: token,
      id: dictator.id  
    };
  }

  async create(dictatorData: Partial<Dictator>) {
    const existingDictators = await this.dictatorsRepository.count();
    const { loyalty = 50, password } = dictatorData;
  
    if (!password) {
      throw new Error('Password is required');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newDictator = this.dictatorsRepository.create({
      ...dictatorData,
      password: hashedPassword,
      role: existingDictators === 0 ? 'admin' : 'dictator',
      loyalty,
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
  async delete(id: string): Promise<void> {
    const dictator = await this.dictatorsRepository.findOne({ where: { id } });
    
    if (!dictator) {
      throw new NotFoundException('Dictator not found');
    }

    await this.dictatorsRepository.remove(dictator);  // Elimina el dictador
  }

 
}
