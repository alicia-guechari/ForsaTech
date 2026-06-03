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
exports.Initiative = exports.InitiativeStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const wilaya_entity_1 = require("./wilaya.entity");
const initiative_support_entity_1 = require("./initiative-support.entity");
const comment_entity_1 = require("./comment.entity");
var InitiativeStatus;
(function (InitiativeStatus) {
    InitiativeStatus["PENDING"] = "pending";
    InitiativeStatus["APPROVED"] = "approved";
    InitiativeStatus["REJECTED"] = "rejected";
})(InitiativeStatus || (exports.InitiativeStatus = InitiativeStatus = {}));
let Initiative = class Initiative {
    id;
    user;
    title;
    description;
    wilaya;
    threshold;
    supportCount;
    status;
    odejResponse;
    linkedOpportunityId;
    createdAt;
    supports;
    comments;
};
exports.Initiative = Initiative;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Initiative.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.initiatives),
    __metadata("design:type", user_entity_1.User)
], Initiative.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Initiative.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Initiative.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wilaya_entity_1.Wilaya, (wilaya) => wilaya.initiatives),
    __metadata("design:type", wilaya_entity_1.Wilaya)
], Initiative.prototype, "wilaya", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], Initiative.prototype, "threshold", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Initiative.prototype, "supportCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InitiativeStatus,
        default: InitiativeStatus.PENDING,
    }),
    __metadata("design:type", String)
], Initiative.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Initiative.prototype, "odejResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Initiative.prototype, "linkedOpportunityId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Initiative.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => initiative_support_entity_1.InitiativeSupport, (support) => support.initiative),
    __metadata("design:type", Array)
], Initiative.prototype, "supports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.initiative),
    __metadata("design:type", Array)
], Initiative.prototype, "comments", void 0);
exports.Initiative = Initiative = __decorate([
    (0, typeorm_1.Entity)('initiatives')
], Initiative);
//# sourceMappingURL=initiative.entity.js.map