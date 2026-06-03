import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Odej } from './odej.entity';

@Entity('faq')
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Odej, (odej) => odej.faqs)
    odej: Odej;

    @Column()
    question: string;

    @Column('text')
    answer: string;

    @Column({
        type: 'tsvector',
        nullable: true,
        select: false,
    })
    @Index('idx_faq_search_vector', { synchronize: false })
    searchVector: any;
}
