import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSlaveDto } from './dto/create-slave.dto';
import { UpdateSlaveDto } from './dto/update-slave.dto';
import { Repository,IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Slave } from './entities/slave.entity';


@Injectable()
export class SlavesService {
  constructor(
    @InjectRepository(Slave)
    private  slaveRepository:Repository<Slave>
  ){}
  async create(createSlaveDto: CreateSlaveDto) {
    const newSlave = this.slaveRepository.
    create(createSlaveDto);
    await this.slaveRepository.save(newSlave);
    return newSlave;
  }

  async findAll(): Promise<Slave[]> {
    return await this.slaveRepository.find(); // Obtiene todos los registros desde Supabase
  }

  async findOne(id: string): Promise<Slave> {
  const slave = await this.slaveRepository.findOne({
    where: { id },
  });

  if (!slave) {
    throw new NotFoundException(`Slave with ID ${id} not found`);
  }

  return slave;
}

async update(id: string, updateSlaveDto: UpdateSlaveDto) {
  const slave = await this.slaveRepository.findOne({ where: { id } });

  if (!slave) {
    throw new NotFoundException(`Slave with ID ${id} not found`);
  }

  await this.slaveRepository.update(id, updateSlaveDto);
  return await this.slaveRepository.findOne({ where: { id } });
}

async updateStatus(id: string, status: string): Promise<Slave> {
  const slave = await this.slaveRepository.findOne({ where: { id } });

  if (!slave) {
    throw new NotFoundException(`Slave with ID ${id} not found`);
  }

  // Opcional: valida que el status sea válido
  const validStatuses = ['alive', 'dead', 'escaped', 'free'];
  if (!validStatuses.includes(status)) {
    throw new Error('Estado inválido');
  }

  slave.status = status as any; // si tienes enum Status, convierte correctamente
  await this.slaveRepository.save(slave);
  return slave;
}

async remove(id: string) {
  const slave = await this.slaveRepository.findOne({ where: { id } });

  if (!slave) {
    throw new NotFoundException(`Slave with ID ${id} not found`);
  }

  await this.slaveRepository.delete(id);
  return { message: `Slave with ID ${id} removed` };
}

  async findUnassigned(): Promise<Slave[]> {
    return this.slaveRepository.find({
      where: { dictator: IsNull() },
    });
  }
}
