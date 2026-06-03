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
exports.Wilaya = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const odej_entity_1 = require("./odej.entity");
const opportunity_entity_1 = require("./opportunity.entity");
const initiative_entity_1 = require("./initiative.entity");
let Wilaya = class Wilaya {
    id;
    name;
    code;
    users;
    odejs;
    opportunities;
    initiatives;
};
exports.Wilaya = Wilaya;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wilaya.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Wilaya.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Wilaya.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.wilaya),
    __metadata("design:type", Array)
], Wilaya.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => odej_entity_1.Odej, (odej) => odej.wilaya),
    __metadata("design:type", Array)
], Wilaya.prototype, "odejs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.Opportunity, (opp) => opp.wilaya),
    __metadata("design:type", Array)
], Wilaya.prototype, "opportunities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => initiative_entity_1.Initiative, (init) => init.wilaya),
    __metadata("design:type", Array)
], Wilaya.prototype, "initiatives", void 0);
exports.Wilaya = Wilaya = __decorate([
    (0, typeorm_1.Entity)('wilayas')
], Wilaya);
//# sourceMappingURL=wilaya.entity.js.map