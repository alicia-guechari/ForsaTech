import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Odej } from './odej.entity';
import { Wilaya } from './wilaya.entity';
import { Application } from './application.entity';
import { Badge } from './badge.entity';

export enum OpportunityStatus {
    OPEN = 'open',
    CLOSED = 'closed',
    COMPLETED = 'completed',
}

@Entity('opportunities')
export class Opportunity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @ManyToOne(() => Category, (cat) => cat.opportunities)
    category: Category;

    @ManyToOne(() => Odej, (odej) => odej.opportunities)
    odej: Odej;

    @ManyToOne(() => Wilaya, (wilaya) => wilaya.opportunities)
    wilaya: Wilaya;

    @Column()
    date: Date;

    @Column({ nullable: true })
    duration: string;

    @Column()
    capacity: number;

    @Column('text', { array: true, default: [] })
    requirements: string[];

    @Column('float', { nullable: true })
    locationLat: number;

    @Column('float', { nullable: true })
    locationLng: number;

    @Column({
        type: 'enum',
        enum: OpportunityStatus,
        default: OpportunityStatus.OPEN,
    })
    status: OpportunityStatus;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Application, (app) => app.opportunity)
    applications: Application[];

    @OneToMany(() => Badge, (badge) => badge.opportunity)
    badges: Badge[];
}
