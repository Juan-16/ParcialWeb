import { Module } from '@nestjs/common';
import { DictatorsService } from './dictators.service';
import { DictatorsController } from './dictators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictator } from './entities/dictator.entity';
import { Slave } from 'src/slaves/entities/slave.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JwtStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SlavesModule } from 'src/slaves/slaves.module';
import { SlavesService } from 'src/slaves/slaves.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dictator, Slave]),ConfigModule,
    SlavesModule, // Importamos el módulo de esclavos
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [DictatorsController],
  providers: [DictatorsService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule, DictatorsService],
})
export class DictatorsModule {}