import { Repository } from 'typeorm';
import { Opportunity } from '../entities/opportunity.entity';
import { User } from '../entities/user.entity';
export declare class OpportunitiesService {
    private opportunitiesRepository;
    constructor(opportunitiesRepository: Repository<Opportunity>);
    findAll(filters: {
        categoryId?: number;
        wilayaId?: number;
        query?: string;
    }): Promise<Opportunity[]>;
    findOne(id: string): Promise<Opportunity | null>;
    getRecommendations(user: User): Promise<Opportunity[]>;
    create(data: Partial<Opportunity>): Promise<Opportunity>;
}
