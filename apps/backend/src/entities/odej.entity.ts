import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Wilaya } from './wilaya.entity';
import { Opportunity } from './opportunity.entity';
import { Faq } from './faq.entity';
import { User } from './user.entity';

@Entity('odej')
export class Odej {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Wilaya, (wilaya) => wilaya.odejs)
    wilaya: Wilaya;

    @Column()
    contactEmail: string;

    @Column({ nullable: true })
    contactPhone: string;

    @Column('text')
    description: string;

    @Column('jsonb', { nullable: true })
    openingHours: any;

    @OneToMany(() => Opportunity, (opp) => opp.odej)
    opportunities: Opportunity[];

    @OneToMany(() => Faq, (faq) => faq.odej)
    faqs: Faq[];

    @OneToOne(() => User)
    @JoinColumn()
    adminUser: User;
}
