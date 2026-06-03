import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Odej } from './odej.entity';
import { Opportunity } from './opportunity.entity';
import { Initiative } from './initiative.entity';

@Entity('wilayas')
export class Wilaya {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    code: string;

    @OneToMany(() => User, (user) => user.wilaya)
    users: User[];

    @OneToMany(() => Odej, (odej) => odej.wilaya)
    odejs: Odej[];

    @OneToMany(() => Opportunity, (opp) => opp.wilaya)
    opportunities: Opportunity[];

    @OneToMany(() => Initiative, (init) => init.wilaya)
    initiatives: Initiative[];
}
