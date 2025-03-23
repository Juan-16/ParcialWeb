import { IsNumber, IsString, MinLength,Max,Min,IsEnum } from "class-validator";

export enum Status {
  ALIVE = 'alive',
  DEAD = 'dead',
  ESCAPED = 'escaped',
  FREE = 'free',
}


export class CreateSlaveDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly nickname: string;
    @IsString()
    readonly origin: string;
    @IsNumber()
    @Min(1)
    @Max(100)
    readonly strength: number;
    @IsNumber()
    @Min(1)
    @Max(100)
    readonly agility: number;
    @IsNumber()
    readonly wins: number;
    @IsNumber()
    readonly losses: number;
    @IsEnum(Status)
    status: Status;
}
