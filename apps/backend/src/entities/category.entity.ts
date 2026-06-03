import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Opportunity } from './opportunity.entity';
import { Badge } from './badge.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    icon: string;

    @Column()
    color: string;

    @OneToMany(() => Opportunity, (opp) => opp.category)
    opportunities: Opportunity[];

    @OneToMany(() => Badge, (badge) => badge.category)
    badges: Badge[];
}
