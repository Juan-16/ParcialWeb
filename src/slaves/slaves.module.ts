import { Module } from '@nestjs/common';
import { SlavesService } from './slaves.service';
import { SlavesController } from './slaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slave } from './entities/slave.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Slave])],
  controllers: [SlavesController],
  providers: [SlavesService],
  exports: [SlavesService],  // IMPORTANTE exportarlo para que otros módulos lo usen
})
export class SlavesModule {}
