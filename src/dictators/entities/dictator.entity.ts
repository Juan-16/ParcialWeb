import { Exclude } from 'class-transformer';
import { BlackMarketTransaction } from 'src/black-market/entities/black-market.entity';
import { Slave } from 'src/slaves/entities/slave.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';

@Entity()
export class Dictator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  territory: string;

  @Column()
  number_of_slaves: number;

  @Column()
  loyalty_to_Carolina: number;

  @Column('text',{
    default:'Admin'
})
  role?:string;

  @Exclude()
  @OneToMany(() => Slave, (slave) => slave.dictator, { cascade: true })
  slaves: Slave[];
// Relación con transacciones donde el dictador es comprador
@OneToMany(() => BlackMarketTransaction, (blackMarket) => blackMarket.buyer)
boughtItems: BlackMarketTransaction[];

// Relación con transacciones donde el dictador es vendedor
@OneToMany(() => BlackMarketTransaction, (blackMarket) => blackMarket.seller)
soldItems: BlackMarketTransaction[];
  @BeforeInsert()
    nameToUpperCase(){
        this.name=this.name.toUpperCase();
    }
}