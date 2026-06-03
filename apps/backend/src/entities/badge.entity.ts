import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Opportunity } from './opportunity.entity';
import { Category } from './category.entity';

@Entity('badges')
export class Badge {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.badges)
    user: User;

    @ManyToOne(() => Opportunity, (opp) => opp.badges)
    opportunity: Opportunity;

    @ManyToOne(() => Category, (cat) => cat.badges)
    category: Category;

    @Column({ unique: true })
    hash: string;

    @Column()
    svgTemplate: string;

    @CreateDateColumn()
    awardedAt: Date;
}
