import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Slave } from 'src/slaves/entities/slave.entity';

@Entity()
export class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column('text', { array: true }) // Guarda la lista de ítems como un array en la BD
  donated_items: string[];

  @ManyToOne(() => Slave, (slave) => slave.sponsors, { nullable: false, onDelete: 'CASCADE' })
  preferred_fighter: Slave;
}