import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';

@Injectable()
export class FaqService {
    constructor(
        @InjectRepository(Faq)
        private faqRepository: Repository<Faq>,
    ) { }

    async search(query: string, wilayaId?: number) {
        if (!query) {
            const qb = this.faqRepository.createQueryBuilder('faq')
                .leftJoinAndSelect('faq.odej', 'odej');
            if (wilayaId) {
                qb.andWhere('odej.wilayaId = :wilayaId', { wilayaId });
            }
            return qb.take(10).getMany();
        }

        // Postgres Full-Text Search
        const qb = this.faqRepository.createQueryBuilder('faq')
            .leftJoinAndSelect('faq.odej', 'odej')
            .where("faq.searchVector @@ plainto_tsquery('english', :query)", { query });

        if (wilayaId) {
            qb.andWhere('odej.wilayaId = :wilayaId', { wilayaId });
        }

        return qb.getMany();
    }

    async create(data: Partial<Faq>) {
        const faq = this.faqRepository.create(data);
        return this.faqRepository.save(faq);
    }
}
