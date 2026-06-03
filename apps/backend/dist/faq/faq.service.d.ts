import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';
export declare class FaqService {
    private faqRepository;
    constructor(faqRepository: Repository<Faq>);
    search(query: string, wilayaId?: number): Promise<Faq[]>;
    create(data: Partial<Faq>): Promise<Faq>;
}
