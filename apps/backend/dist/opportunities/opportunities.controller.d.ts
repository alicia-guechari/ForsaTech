import { OpportunitiesService } from './opportunities.service';
export declare class OpportunitiesController {
    private readonly opportunitiesService;
    constructor(opportunitiesService: OpportunitiesService);
    findAll(categoryId?: number, wilayaId?: number, query?: string): Promise<import("../entities/opportunity.entity").Opportunity[]>;
    getRecommendations(req: any): Promise<import("../entities/opportunity.entity").Opportunity[]>;
    findOne(id: string): Promise<import("../entities/opportunity.entity").Opportunity | null>;
    create(data: any): Promise<import("../entities/opportunity.entity").Opportunity>;
}
