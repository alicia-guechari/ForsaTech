import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Initiative } from './initiative.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Initiative, (init) => init.comments)
    initiative: Initiative;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;
}
