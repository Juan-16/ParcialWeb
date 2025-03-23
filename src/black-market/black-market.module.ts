import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackMarketService } from './black-market.service';
import { BlackMarketController } from './black-market.controller';
import { BlackMarketTransaction } from './entities/black-market.entity';
import { Dictator } from 'src/dictators/entities/dictator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlackMarketTransaction, Dictator])],
  controllers: [BlackMarketController],
  providers: [BlackMarketService],
  exports: [BlackMarketService],
})
export class BlackMarketModule {}