"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
dotenv.config({ path: (0, path_1.join)(__dirname, '..', '.env') });
const wilaya_entity_1 = require("./entities/wilaya.entity");
const category_entity_1 = require("./entities/category.entity");
const user_entity_1 = require("./entities/user.entity");
const odej_entity_1 = require("./entities/odej.entity");
const opportunity_entity_1 = require("./entities/opportunity.entity");
const application_entity_1 = require("./entities/application.entity");
const initiative_entity_1 = require("./entities/initiative.entity");
const initiative_support_entity_1 = require("./entities/initiative-support.entity");
const faq_entity_1 = require("./entities/faq.entity");
const badge_entity_1 = require("./entities/badge.entity");
const notification_entity_1 = require("./entities/notification.entity");
const comment_entity_1 = require("./entities/comment.entity");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const wilayas_module_1 = require("./wilayas/wilayas.module");
const categories_module_1 = require("./categories/categories.module");
const opportunities_module_1 = require("./opportunities/opportunities.module");
const initiatives_module_1 = require("./initiatives/initiatives.module");
const applications_module_1 = require("./applications/applications.module");
const faq_module_1 = require("./faq/faq.module");
const badges_module_1 = require("./badges/badges.module");
const notifications_module_1 = require("./notifications/notifications.module");
const odej_module_1 = require("./odej/odej.module");
const dbType = (process.env.DB_TYPE || 'postgres');
const typeOrmConfig = dbType === 'sqlite' ? {
    type: 'better-sqlite3',
    database: process.env.DB_SQLITE_PATH || 'data/forsatech.sqlite',
    entities: [
        wilaya_entity_1.Wilaya, category_entity_1.Category, user_entity_1.User, odej_entity_1.Odej, opportunity_entity_1.Opportunity,
        application_entity_1.Application, initiative_entity_1.Initiative, initiative_support_entity_1.InitiativeSupport,
        faq_entity_1.Faq, badge_entity_1.Badge, notification_entity_1.Notification, comment_entity_1.Comment
    ],
    synchronize: true,
    logging: false,
} : {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'forsatech',
    entities: [
        wilaya_entity_1.Wilaya, category_entity_1.Category, user_entity_1.User, odej_entity_1.Odej, opportunity_entity_1.Opportunity,
        application_entity_1.Application, initiative_entity_1.Initiative, initiative_support_entity_1.InitiativeSupport,
        faq_entity_1.Faq, badge_entity_1.Badge, notification_entity_1.Notification, comment_entity_1.Comment
    ],
    synchronize: true,
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(typeOrmConfig),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            wilayas_module_1.WilayasModule,
            categories_module_1.CategoriesModule,
            opportunities_module_1.OpportunitiesModule,
            initiatives_module_1.InitiativesModule,
            applications_module_1.ApplicationsModule,
            faq_module_1.FaqModule,
            badges_module_1.BadgesModule,
            notifications_module_1.NotificationsModule,
            odej_module_1.OdejModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map