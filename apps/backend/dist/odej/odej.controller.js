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
exports.OdejController = void 0;
const common_1 = require("@nestjs/common");
const odej_service_1 = require("./odej.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let OdejController = class OdejController {
    odejService;
    constructor(odejService) {
        this.odejService = odejService;
    }
    findAll(wilayaId) {
        if (wilayaId)
            return this.odejService.findByWilaya(wilayaId);
        return [];
    }
    findMe(req) {
        return this.odejService.findByAdmin(req.user);
    }
    findOne(id) {
        return this.odejService.findOne(id);
    }
    create(data) {
        return this.odejService.create(data);
    }
    update(id, data) {
        return this.odejService.update(id, data);
    }
};
exports.OdejController = OdejController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('wilayaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OdejController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OdejController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OdejController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OdejController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OdejController.prototype, "update", null);
exports.OdejController = OdejController = __decorate([
    (0, common_1.Controller)('odej'),
    __metadata("design:paramtypes", [odej_service_1.OdejService])
], OdejController);
//# sourceMappingURL=odej.controller.js.map