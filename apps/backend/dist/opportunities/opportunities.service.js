"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const opportunity_entity_1 = require("../entities/opportunity.entity");
let OpportunitiesService = class OpportunitiesService {
    opportunitiesRepository;
    constructor(opportunitiesRepository) {
        this.opportunitiesRepository = opportunitiesRepository;
    }
    async findAll(filters) {
        const query = this.opportunitiesRepository.createQueryBuilder('opp')
            .leftJoinAndSelect('opp.category', 'category')
            .leftJoinAndSelect('opp.wilaya', 'wilaya')
            .leftJoinAndSelect('opp.odej', 'odej')
            .where('opp.status = :status', { status: opportunity_entity_1.OpportunityStatus.OPEN });
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
    async findOne(id) {
        return this.opportunitiesRepository.findOne({
            where: { id },
            relations: { category: true, wilaya: true, odej: true, applications: true },
        });
    }
    async getRecommendations(user) {
        return this.opportunitiesRepository.find({
            where: [
                { wilaya: { id: user.wilaya?.id }, status: opportunity_entity_1.OpportunityStatus.OPEN },
                { category: { name: (0, typeorm_2.In)(user.interests) }, status: opportunity_entity_1.OpportunityStatus.OPEN }
            ],
            relations: { category: true, wilaya: true },
            take: 10,
        });
    }
    async create(data) {
        const opp = this.opportunitiesRepository.create(data);
        return this.opportunitiesRepository.save(opp);
    }
};
exports.OpportunitiesService = OpportunitiesService;
exports.OpportunitiesService = OpportunitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(opportunity_entity_1.Opportunity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OpportunitiesService);
//# sourceMappingURL=opportunities.service.js.map