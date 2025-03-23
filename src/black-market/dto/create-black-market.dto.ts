import { IsBoolean, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { BlackMarketStatus } from '../entities/black-market.entity';

export class CreateBlackMarketDto {
    @IsUUID()
    buyerId: string;
  
    @IsUUID()
    sellerId: string;
  
    @IsString()
    item: string;
  
    @IsNumber()
    amount: number;
  
    @IsEnum(['Completed', 'Failed', 'Discovered'])
    status: string;
  
    @IsBoolean()
    @IsOptional()
    isRansom?: boolean;
  }