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
exports.Badge = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const opportunity_entity_1 = require("./opportunity.entity");
const category_entity_1 = require("./category.entity");
let Badge = class Badge {
    id;
    user;
    opportunity;
    category;
    hash;
    svgTemplate;
    awardedAt;
};
exports.Badge = Badge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Badge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.badges),
    __metadata("design:type", user_entity_1.User)
], Badge.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opportunity_entity_1.Opportunity, (opp) => opp.badges),
    __metadata("design:type", opportunity_entity_1.Opportunity)
], Badge.prototype, "opportunity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (cat) => cat.badges),
    __metadata("design:type", category_entity_1.Category)
], Badge.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Badge.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Badge.prototype, "svgTemplate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Badge.prototype, "awardedAt", void 0);
exports.Badge = Badge = __decorate([
    (0, typeorm_1.Entity)('badges')
], Badge);
//# sourceMappingURL=badge.entity.js.map