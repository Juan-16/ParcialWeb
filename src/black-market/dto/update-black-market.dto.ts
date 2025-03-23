import { PartialType } from '@nestjs/mapped-types';
import { CreateBlackMarketDto } from './create-black-market.dto';

export class UpdateBlackMarketDto extends PartialType(CreateBlackMarketDto) {}
