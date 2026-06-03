import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config({ path: join(__dirname, '..', '.env') });

// Entities
import { Wilaya } from './entities/wilaya.entity';
import { Category } from './entities/category.entity';
import { User } from './entities/user.entity';
import { Odej } from './entities/odej.entity';
import { Opportunity } from './entities/opportunity.entity';
import { Application } from './entities/application.entity';
import { Initiative } from './entities/initiative.entity';
import { InitiativeSupport } from './entities/initiative-support.entity';
import { Faq } from './entities/faq.entity';
import { Badge } from './entities/badge.entity';
import { Notification } from './entities/notification.entity';
import { Comment } from './entities/comment.entity';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WilayasModule } from './wilayas/wilayas.module';
import { CategoriesModule } from './categories/categories.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { InitiativesModule } from './initiatives/initiatives.module';
import { ApplicationsModule } from './applications/applications.module';
import { FaqModule } from './faq/faq.module';
import { BadgesModule } from './badges/badges.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OdejModule } from './odej/odej.module';

const dbType = (process.env.DB_TYPE || 'postgres') as 'postgres' | 'sqlite';
const typeOrmConfig = dbType === 'sqlite' ? {
  type: 'better-sqlite3' as const,
  database: process.env.DB_SQLITE_PATH || 'data/forsatech.sqlite',
  entities: [
    Wilaya, Category, User, Odej, Opportunity,
    Application, Initiative, InitiativeSupport,
    Faq, Badge, Notification, Comment
  ],
  synchronize: true,
  logging: false,
} : {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'forsatech',
  entities: [
    Wilaya, Category, User, Odej, Opportunity,
    Application, Initiative, InitiativeSupport,
    Faq, Badge, Notification, Comment
  ],
  synchronize: true, // Only for development
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig as any),
    AuthModule,
    UsersModule,
    WilayasModule,
    CategoriesModule,
    OpportunitiesModule,
    InitiativesModule,
    ApplicationsModule,
    FaqModule,
    BadgesModule,
    NotificationsModule,
    OdejModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
