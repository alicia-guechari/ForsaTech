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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const application_entity_1 = require("../entities/application.entity");
const opportunity_entity_1 = require("../entities/opportunity.entity");
let ApplicationsService = class ApplicationsService {
    applicationRepository;
    opportunityRepository;
    constructor(applicationRepository, opportunityRepository) {
        this.applicationRepository = applicationRepository;
        this.opportunityRepository = opportunityRepository;
    }
    async apply(user, opportunityId) {
        const opp = await this.opportunityRepository.findOne({
            where: { id: opportunityId },
            relations: { applications: true },
        });
        if (!opp)
            throw new common_1.BadRequestException('Opportunity not found');
        if (opp.status !== opportunity_entity_1.OpportunityStatus.OPEN)
            throw new common_1.BadRequestException('Opportunity is not open');
        if (opp.applications.length >= opp.capacity) {
            throw new common_1.BadRequestException('Opportunity is full');
        }
        const existing = await this.applicationRepository.findOneBy({
            user: { id: user.id },
            opportunity: { id: opportunityId },
        });
        if (existing)
            throw new common_1.BadRequestException('You already applied');
        const app = this.applicationRepository.create({
            user,
            opportunity: opp,
        });
        return this.applicationRepository.save(app);
    }
    async findByMe(user) {
        return this.applicationRepository.find({
            where: { user: { id: user.id } },
            relations: { opportunity: { category: true } },
        });
    }
    async findByOdej(odejAdmin) {
        return this.applicationRepository.find({
            relations: { user: true, opportunity: true },
            where: { opportunity: { odej: { adminUser: { id: odejAdmin.id } } } },
        });
    }
    async updateStatus(id, status) {
        await this.applicationRepository.update(id, { status });
        return this.applicationRepository.findOneBy({ id });
    }
    async delete(id) {
        const app = await this.applicationRepository.findOneBy({ id });
        if (!app)
            throw new common_1.BadRequestException('Application not found');
        await this.applicationRepository.delete(id);
        return { success: true };
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(application_entity_1.Application)),
    __param(1, (0, typeorm_1.InjectRepository)(opportunity_entity_1.Opportunity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map