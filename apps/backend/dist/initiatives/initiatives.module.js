"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiativesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const initiative_entity_1 = require("../entities/initiative.entity");
const initiative_support_entity_1 = require("../entities/initiative-support.entity");
const initiatives_service_1 = require("./initiatives.service");
const initiatives_controller_1 = require("./initiatives.controller");
let InitiativesModule = class InitiativesModule {
};
exports.InitiativesModule = InitiativesModule;
exports.InitiativesModule = InitiativesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([initiative_entity_1.Initiative, initiative_support_entity_1.InitiativeSupport])],
        providers: [initiatives_service_1.InitiativesService],
        controllers: [initiatives_controller_1.InitiativesController],
        exports: [initiatives_service_1.InitiativesService],
    })
], InitiativesModule);
//# sourceMappingURL=initiatives.module.js.map