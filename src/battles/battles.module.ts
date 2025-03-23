import { Module } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlesController } from './battles.controller';
import { Battle } from './entities/battle.entity'
import { Slave } from 'src/slaves/entities/slave.entity';
import { DictatorsModule } from 'src/dictators/dictators.module';
import { Dictator } from 'src/dictators/entities/dictator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Battle, Slave, Dictator]), 
    DictatorsModule, 
  ],
  controllers: [BattlesController],
  providers: [BattlesService],
})
export class BattlesModule {}
