import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateDictatorDto {
  @IsString()
  name: string;

  @IsString()
  territory: string;

  @IsInt()
  @Min(0) 
  number_of_slaves: number;

  @IsInt()
  @Min(1)
  @Max(100) 
  loyalty: number;

  @IsOptional()
  @IsString()
  role?: string; 
}


