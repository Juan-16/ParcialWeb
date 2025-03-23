import { Transform } from 'class-transformer';
import { IsUUID, IsString, IsOptional, IsDate, IsISO8601, IsDateString } from 'class-validator';

export class CreateBattleDto {
  @IsUUID()
  readonly contestant_1: string; 

  @IsUUID()
  readonly contestant_2: string; 

  @IsUUID()
  @IsOptional() 
  readonly winner_id?: string;

  @IsString()
  readonly injuries: string; 
  
  @IsDateString() 
  readonly date: string;
}