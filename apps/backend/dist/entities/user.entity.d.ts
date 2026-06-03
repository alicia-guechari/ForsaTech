import { Wilaya } from './wilaya.entity';
import { Application } from './application.entity';
import { Initiative } from './initiative.entity';
import { InitiativeSupport } from './initiative-support.entity';
import { Badge } from './badge.entity';
import { Notification } from './notification.entity';
import { Comment } from './comment.entity';
export declare enum UserRole {
    YOUTH = "youth",
    ODEJ = "odej",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    avatarUrl: string;
    wilaya: Wilaya;
    interests: string[];
    role: UserRole;
    createdAt: Date;
    applications: Application[];
    initiatives: Initiative[];
    supports: InitiativeSupport[];
    badges: Badge[];
    notifications: Notification[];
    comments: Comment[];
}
