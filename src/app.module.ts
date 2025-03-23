import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlavesModule } from './slaves/slaves.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattlesModule } from './battles/battles.module';
import { DictatorsModule } from './dictators/dictators.module';
import { SponsorsModule } from './sponsors/sponsors.module';
import { BlackMarketModule } from './black-market/black-market.module';

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Agregado aquí
@Module({
  imports: [
    ConfigModule.forRoot(), 
    SlavesModule,
     
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
     
    BattlesModule,
     
    DictatorsModule,
     
    SponsorsModule,
     
    BlackMarketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
