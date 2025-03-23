import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlackMarketTransaction } from './entities/black-market.entity';
import { CreateBlackMarketDto } from './dto/create-black-market.dto';
import { Dictator } from 'src/dictators/entities/dictator.entity';
import { UpdateBlackMarketDto } from './dto/update-black-market.dto';

@Injectable()
export class BlackMarketService {
  constructor(
    @InjectRepository(BlackMarketTransaction)
    private readonly blackMarketRepository: Repository<BlackMarketTransaction>,

    @InjectRepository(Dictator)
    private readonly dictatorRepository: Repository<Dictator>,
  ) {}

  async create(createBlackMarketDto: CreateBlackMarketDto): Promise<BlackMarketTransaction> {
    const { buyerId: buyerId, sellerId: sellerId, item, amount, status } = createBlackMarketDto;

    const buyer = await this.dictatorRepository.findOne({ where: { id: buyerId } });
    if (!buyer) throw new NotFoundException('Buyer (dictator) not found');

    const seller = await this.dictatorRepository.findOne({ where: { id: sellerId } });
    if (!seller) throw new NotFoundException('Seller (dictator) not found');

    const transaction = this.blackMarketRepository.create({
      buyer,
      seller,
      item,
      amount,
      status,
    });

    return this.blackMarketRepository.save(transaction);
  }

  async findAll(): Promise<BlackMarketTransaction[]> {
    return this.blackMarketRepository.find({ relations: ['buyer', 'seller'] });
  }

  async findOne(id: string): Promise<BlackMarketTransaction> {
    const transaction = await this.blackMarketRepository.findOne({
      where: { id },
      relations: ['buyer', 'seller'],
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async update(id: string, updateBlackMarketDto: UpdateBlackMarketDto): Promise<BlackMarketTransaction> {
    const transaction = await this.blackMarketRepository.findOne({ where: { id } });
  
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  
    Object.assign(transaction, updateBlackMarketDto);
    return this.blackMarketRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    const result = await this.blackMarketRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Transaction not found');
  }
}