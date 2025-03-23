import { Transform } from 'class-transformer';
import { IsUUID, IsString, IsOptional, IsDate, IsISO8601, IsDateString } from 'class-validator';

export class CreateBattleDto {
  @IsUUID()
  readonly contestant_1: string; // ID del primer luchador

  @IsUUID()
  readonly contestant_2: string; // ID del segundo luchador

  @IsUUID()
  @IsOptional() // Puede ser nulo hasta que haya un ganador
  readonly winner_id?: string;

  @IsString()
  readonly injuries: string; // Reporte de daños en la batalla
  
  @IsDateString() 
  readonly date: string;
}