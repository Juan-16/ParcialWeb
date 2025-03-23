import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slave } from 'src/slaves/entities/slave.entity';

@Entity()
export class Battle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Slave, { nullable: false }) 
    contestant_1: Slave;

    @ManyToOne(() => Slave, { nullable: false })
    contestant_2: Slave;

    @ManyToOne(() => Slave, { nullable: false }) 
    winner: Slave;

    @Column('text', { nullable: false })
    injuries: string; 

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP" 
    })
    date: Date; 
}