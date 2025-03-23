import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../dto/create-slave.dto";
import { Battle } from "src/battles/entities/battle.entity";
import { Dictator } from "src/dictators/entities/dictator.entity";
import { Sponsor } from 'src/sponsors/entities/sponsor.entity';
import { Exclude } from "class-transformer";

@Entity()
export class Slave {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column('text',{
        unique:true,
        nullable:false,
    })
    name:string;
    @Column('text',{
        nullable:false,
    })
    nickname:string;
    @Column('text',{
        nullable:false,
    })
    origin:string;
    @Column('numeric',{
        nullable:false,
    })  
    strength:number;
    @Column('numeric',{
        nullable:false,
    })  
    agility:number;
    @Column('numeric',{
        nullable:false,
    })  
    wins:number;
    @Column('numeric',{
        nullable:false,
    })  
    losses:number;
    @Column({
        type: "enum",   // 👈 Hace que 'status' sea un enum en la base de datos
        enum: Status,
        default: Status.ALIVE,
    })
    status: Status;
    
    @Exclude()
      // Relación con las batallas donde el esclavo fue un combatiente
      @OneToMany(() => Battle, battle => battle.contestant_1)
      battlesAsContestant1: Battle[];
  
      @OneToMany(() => Battle, battle => battle.contestant_2)
      battlesAsContestant2: Battle[];
  
      // Relación con las batallas donde el esclavo fue el ganador
      @OneToMany(() => Battle, battle => battle.winner)
      battlesWon: Battle[];

      
      @OneToMany(() => Sponsor, (sponsor) => sponsor.preferred_fighter)
      sponsors: Sponsor[];

      
      @ManyToOne(() => Dictator, (dictator) => dictator.slaves, { onDelete: 'CASCADE' })
      dictator: Dictator;

}
