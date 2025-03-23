import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slave } from 'src/slaves/entities/slave.entity';

@Entity()
export class Battle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Slave, { nullable: false }) // Relación con los esclavos
    contestant_1: Slave;

    @ManyToOne(() => Slave, { nullable: false })
    contestant_2: Slave;

    @ManyToOne(() => Slave, { nullable: false }) 
    winner: Slave;

    @Column('text', { nullable: false })
    injuries: string; // Descripción de los daños

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP" // ✅ Corrección
    })
    date: Date; // Fecha de la pelea
}