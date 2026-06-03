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
exports.Opportunity = exports.OpportunityStatus = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const odej_entity_1 = require("./odej.entity");
const wilaya_entity_1 = require("./wilaya.entity");
const application_entity_1 = require("./application.entity");
const badge_entity_1 = require("./badge.entity");
var OpportunityStatus;
(function (OpportunityStatus) {
    OpportunityStatus["OPEN"] = "open";
    OpportunityStatus["CLOSED"] = "closed";
    OpportunityStatus["COMPLETED"] = "completed";
})(OpportunityStatus || (exports.OpportunityStatus = OpportunityStatus = {}));
let Opportunity = class Opportunity {
    id;
    title;
    description;
    category;
    odej;
    wilaya;
    date;
    duration;
    capacity;
    requirements;
    locationLat;
    locationLng;
    status;
    createdAt;
    applications;
    badges;
};
exports.Opportunity = Opportunity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Opportunity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Opportunity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Opportunity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (cat) => cat.opportunities),
    __metadata("design:type", category_entity_1.Category)
], Opportunity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => odej_entity_1.Odej, (odej) => odej.opportunities),
    __metadata("design:type", odej_entity_1.Odej)
], Opportunity.prototype, "odej", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wilaya_entity_1.Wilaya, (wilaya) => wilaya.opportunities),
    __metadata("design:type", wilaya_entity_1.Wilaya)
], Opportunity.prototype, "wilaya", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Opportunity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Opportunity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Opportunity.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Opportunity.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Opportunity.prototype, "locationLat", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], Opportunity.prototype, "locationLng", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OpportunityStatus,
        default: OpportunityStatus.OPEN,
    }),
    __metadata("design:type", String)
], Opportunity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Opportunity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.Application, (app) => app.opportunity),
    __metadata("design:type", Array)
], Opportunity.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => badge_entity_1.Badge, (badge) => badge.opportunity),
    __metadata("design:type", Array)
], Opportunity.prototype, "badges", void 0);
exports.Opportunity = Opportunity = __decorate([
    (0, typeorm_1.Entity)('opportunities')
], Opportunity);
//# sourceMappingURL=opportunity.entity.js.map