import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './entities/battle.entity';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { Slave } from 'src/slaves/entities/slave.entity';
import { Dictator } from 'src/dictators/entities/dictator.entity';

@Injectable()
export class BattlesService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    @InjectRepository(Slave)
    private readonly slaveRepository: Repository<Slave>,
    @InjectRepository(Dictator)
    private readonly dictatorsRepository: Repository<Dictator>,
  ) {}

  async create(dictatorId: string, createBattleDto: CreateBattleDto) {
    const { contestant_1, contestant_2, winner_id, injuries } = createBattleDto;

    // 🔹 Buscar al dictador que intenta crear la batalla
    const dictator = await this.dictatorsRepository.findOne({ where: { id: dictatorId } });
    if (!dictator) {
      throw new UnauthorizedException('Dictador no encontrado');
    }

    // 🔹 Verificar que sea admin
    if (dictator.role !== 'admin') {
      throw new UnauthorizedException('Solo los administradores pueden crear batallas');
    }

    // 🔹 Buscar combatientes
    const contestant1 = await this.slaveRepository.findOne({ where: { id: contestant_1 } });
    const contestant2 = await this.slaveRepository.findOne({ where: { id: contestant_2 } });

    if (!contestant1 || !contestant2) {
      throw new NotFoundException('Uno o ambos combatientes no existen');
    }

    // 🔹 Buscar ganador
    let winner: Slave | null = null;
    if (winner_id) {
      winner = await this.slaveRepository.findOne({ where: { id: winner_id } });
      if (!winner) {
        throw new NotFoundException('El ganador especificado no existe');
      }
    } else {
      throw new BadRequestException('Debe especificarse un ganador');
    }

    // 🔹 Crear batalla
    const battle = this.battleRepository.create({
      contestant_1: contestant1,
      contestant_2: contestant2,
      winner: winner,
      injuries,
    });

    await this.battleRepository.save(battle);

    // 🔹 Actualizar estadísticas
    if (winner.id === contestant1.id) {
      contestant1.wins++;
      contestant2.losses++;
    } else {
      contestant2.wins++;
      contestant1.losses++;
    }

    await this.slaveRepository.save([contestant1, contestant2]);

    return battle;
  }


  async findAll(): Promise<Battle[]> {
    return this.battleRepository.find({ relations: ['contestant_1', 'contestant_2', 'winner'] });
  }

  async findOne(id: string): Promise<Battle> {
    const battle = await this.battleRepository.findOne({
      where: { id },
      relations: ['contestant_1', 'contestant_2', 'winner'],
    });

    if (!battle) {
      throw new NotFoundException(`Batalla con ID ${id} no encontrada`);
    }

    return battle;
  }

  async update(id: string, updateBattleDto: UpdateBattleDto): Promise<Battle> {
    const battle = await this.findOne(id);
    Object.assign(battle, updateBattleDto);
    return this.battleRepository.save(battle);
  }

  async remove(id: string): Promise<void> {
    const result = await this.battleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Batalla con ID ${id} no encontrada`);
    }
  }
}