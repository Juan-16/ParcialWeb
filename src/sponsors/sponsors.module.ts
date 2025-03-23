import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';
import { Slave } from 'src/slaves/entities/slave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sponsor, Slave])],
  providers: [SponsorsService],
  controllers: [SponsorsController],
  exports: [SponsorsService],
})
export class SponsorsModule {}