// login.dto.ts
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  name: string;  // Cambié 'username' a 'name'

  @IsString()
  @MinLength(6)
  password: string;
}