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
exports.Faq = void 0;
const typeorm_1 = require("typeorm");
const odej_entity_1 = require("./odej.entity");
let Faq = class Faq {
    id;
    odej;
    question;
    answer;
    searchVector;
};
exports.Faq = Faq;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Faq.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => odej_entity_1.Odej, (odej) => odej.faqs),
    __metadata("design:type", odej_entity_1.Odej)
], Faq.prototype, "odej", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Faq.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Faq.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tsvector',
        nullable: true,
        select: false,
    }),
    (0, typeorm_1.Index)('idx_faq_search_vector', { synchronize: false }),
    __metadata("design:type", Object)
], Faq.prototype, "searchVector", void 0);
exports.Faq = Faq = __decorate([
    (0, typeorm_1.Entity)('faq')
], Faq);
//# sourceMappingURL=faq.entity.js.map