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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const wilaya_entity_1 = require("./wilaya.entity");
const application_entity_1 = require("./application.entity");
const initiative_entity_1 = require("./initiative.entity");
const initiative_support_entity_1 = require("./initiative-support.entity");
const badge_entity_1 = require("./badge.entity");
const notification_entity_1 = require("./notification.entity");
const comment_entity_1 = require("./comment.entity");
var UserRole;
(function (UserRole) {
    UserRole["YOUTH"] = "youth";
    UserRole["ODEJ"] = "odej";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    id;
    email;
    passwordHash;
    name;
    avatarUrl;
    wilaya;
    interests;
    role;
    createdAt;
    applications;
    initiatives;
    supports;
    badges;
    notifications;
    comments;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wilaya_entity_1.Wilaya, (wilaya) => wilaya.users),
    __metadata("design:type", wilaya_entity_1.Wilaya)
], User.prototype, "wilaya", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.YOUTH,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => application_entity_1.Application, (app) => app.user),
    __metadata("design:type", Array)
], User.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => initiative_entity_1.Initiative, (init) => init.user),
    __metadata("design:type", Array)
], User.prototype, "initiatives", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => initiative_support_entity_1.InitiativeSupport, (support) => support.user),
    __metadata("design:type", Array)
], User.prototype, "supports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => badge_entity_1.Badge, (badge) => badge.user),
    __metadata("design:type", Array)
], User.prototype, "badges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notif) => notif.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map