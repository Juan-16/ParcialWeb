import { IsUUID, IsString, IsArray } from 'class-validator';

export class CreateSponsorDto {
  @IsString()
  company_name: string;

  @IsArray()
  @IsString({ each: true })
  donated_items: string[];

  @IsUUID()
  preferred_fighter: string;
}