import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { Initiative } from './initiative.entity';

@Entity('initiative_supports')
@Unique(['user', 'initiative'])
export class InitiativeSupport {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.supports)
    user: User;

    @ManyToOne(() => Initiative, (init) => init.supports)
    initiative: Initiative;

    @CreateDateColumn()
    createdAt: Date;
}
