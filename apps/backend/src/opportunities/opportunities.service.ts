import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Opportunity, OpportunityStatus } from '../entities/opportunity.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OpportunitiesService {
    constructor(
        @InjectRepository(Opportunity)
        private opportunitiesRepository: Repository<Opportunity>,
    ) { }

    async findAll(filters: { categoryId?: number; wilayaId?: number; query?: string }) {
        const query = this.opportunitiesRepository.createQueryBuilder('opp')
            .leftJoinAndSelect('opp.category', 'category')
            .leftJoinAndSelect('opp.wilaya', 'wilaya')
            .leftJoinAndSelect('opp.odej', 'odej')
            .where('opp.status = :status', { status: OpportunityStatus.OPEN });

        if (filters.categoryId) {
            query.andWhere('category.id = :categoryId', { categoryId: filters.categoryId });
        }

        if (filters.wilayaId) {
            query.andWhere('wilaya.id = :wilayaId', { wilayaId: filters.wilayaId });
        }

        if (filters.query) {
            query.andWhere('(opp.title ILIKE :q OR opp.description ILIKE :q)', { q: `%${filters.query}%` });
        }

        return query.getMany();
    }

    async findOne(id: string) {
        return this.opportunitiesRepository.findOne({
            where: { id },
            relations: { category: true, wilaya: true, odej: true, applications: true },
        });
    }

    async getRecommendations(user: User) {
        // Simple matching: logic: opportunities in user's wilaya or matching user's interests
        return this.opportunitiesRepository.find({
            where: [
                { wilaya: { id: user.wilaya?.id }, status: OpportunityStatus.OPEN },
                { category: { name: In(user.interests) }, status: OpportunityStatus.OPEN }
            ],
            relations: { category: true, wilaya: true },
            take: 10,
        });
    }

    async create(data: Partial<Opportunity>) {
        const opp = this.opportunitiesRepository.create(data);
        return this.opportunitiesRepository.save(opp);
    }
}
