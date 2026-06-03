import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Wilaya } from './wilaya.entity';
import { InitiativeSupport } from './initiative-support.entity';
import { Comment } from './comment.entity';

export enum InitiativeStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity('initiatives')
export class Initiative {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.initiatives)
    user: User;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @ManyToOne(() => Wilaya, (wilaya) => wilaya.initiatives)
    wilaya: Wilaya;

    @Column({ default: 50 })
    threshold: number;

    @Column({ default: 0 })
    supportCount: number;

    @Column({
        type: 'enum',
        enum: InitiativeStatus,
        default: InitiativeStatus.PENDING,
    })
    status: InitiativeStatus;

    @Column({ nullable: true })
    odejResponse: string;

    @Column({ nullable: true })
    linkedOpportunityId: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => InitiativeSupport, (support) => support.initiative)
    supports: InitiativeSupport[];

    @OneToMany(() => Comment, (comment) => comment.initiative)
    comments: Comment[];
}
