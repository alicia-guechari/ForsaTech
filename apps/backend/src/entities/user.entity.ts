import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Wilaya } from './wilaya.entity';
import { Application } from './application.entity';
import { Initiative } from './initiative.entity';
import { InitiativeSupport } from './initiative-support.entity';
import { Badge } from './badge.entity';
import { Notification } from './notification.entity';
import { Comment } from './comment.entity';

export enum UserRole {
    YOUTH = 'youth',
    ODEJ = 'odej',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    passwordHash: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @ManyToOne(() => Wilaya, (wilaya) => wilaya.users)
    wilaya: Wilaya;

    @Column('text', { array: true, default: [] })
    interests: string[];

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.YOUTH,
    })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Application, (app) => app.user)
    applications: Application[];

    @OneToMany(() => Initiative, (init) => init.user)
    initiatives: Initiative[];

    @OneToMany(() => InitiativeSupport, (support) => support.user)
    supports: InitiativeSupport[];

    @OneToMany(() => Badge, (badge) => badge.user)
    badges: Badge[];

    @OneToMany(() => Notification, (notif) => notif.user)
    notifications: Notification[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
