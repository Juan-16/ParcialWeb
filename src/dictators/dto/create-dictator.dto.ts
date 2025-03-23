import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateDictatorDto {
  @IsString()
  name: string;

  @IsString()
  territory: string;

  @IsInt()
  @Min(0) // No puede tener esclavos negativos
  number_of_slaves: number;

  @IsInt()
  @Min(1)
  @Max(100) // Lealtad entre 1 y 100
  loyalty: number;

  @IsOptional()
  @IsString()
  role?: string; // Se asignará automáticamente en el servicio
}


