import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dictator } from 'src/dictators/entities/dictator.entity';

export enum BlackMarketStatus {
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  DISCOVERED = 'Discovered',
}

@Entity()
export class BlackMarketTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Dictator, (dictator) => dictator.boughtItems)
  buyer: Dictator;

  @ManyToOne(() => Dictator, (dictator) => dictator.soldItems)
  seller: Dictator;

  @Column()
  item: string;

  @Column('decimal')
  amount: number;

  @Column({ type: 'enum', enum: ['Completed', 'Failed', 'Discovered'] })
  status: string;

  @Column({ default: false }) 
  isRansom: boolean;
}