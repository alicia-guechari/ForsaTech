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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Odej = void 0;
const typeorm_1 = require("typeorm");
const wilaya_entity_1 = require("./wilaya.entity");
const opportunity_entity_1 = require("./opportunity.entity");
const faq_entity_1 = require("./faq.entity");
const user_entity_1 = require("./user.entity");
let Odej = class Odej {
    id;
    wilaya;
    contactEmail;
    contactPhone;
    description;
    openingHours;
    opportunities;
    faqs;
    adminUser;
};
exports.Odej = Odej;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Odej.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wilaya_entity_1.Wilaya, (wilaya) => wilaya.odejs),
    __metadata("design:type", wilaya_entity_1.Wilaya)
], Odej.prototype, "wilaya", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Odej.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Odej.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Odej.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Odej.prototype, "openingHours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.Opportunity, (opp) => opp.odej),
    __metadata("design:type", Array)
], Odej.prototype, "opportunities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => faq_entity_1.Faq, (faq) => faq.odej),
    __metadata("design:type", Array)
], Odej.prototype, "faqs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Odej.prototype, "adminUser", void 0);
exports.Odej = Odej = __decorate([
    (0, typeorm_1.Entity)('odej')
], Odej);
//# sourceMappingURL=odej.entity.js.map