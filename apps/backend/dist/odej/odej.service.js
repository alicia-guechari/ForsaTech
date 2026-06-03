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
exports.OdejService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const odej_entity_1 = require("../entities/odej.entity");
let OdejService = class OdejService {
    odejRepository;
    constructor(odejRepository) {
        this.odejRepository = odejRepository;
    }
    async findByWilaya(wilayaId) {
        return this.odejRepository.find({
            where: { wilaya: { id: wilayaId } },
            relations: { wilaya: true },
        });
    }
    async findOne(id) {
        return this.odejRepository.findOne({
            where: { id },
            relations: { wilaya: true, opportunities: true, faqs: true },
        });
    }
    async findByAdmin(user) {
        return this.odejRepository.findOne({
            where: { adminUser: { id: user.id } },
            relations: { wilaya: true },
        });
    }
    async create(data) {
        const odej = this.odejRepository.create(data);
        return this.odejRepository.save(odej);
    }
    async update(id, data) {
        await this.odejRepository.update(id, data);
        return this.findOne(id);
    }
};
exports.OdejService = OdejService;
exports.OdejService = OdejService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(odej_entity_1.Odej)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OdejService);
//# sourceMappingURL=odej.service.js.map