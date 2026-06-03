import { Category } from './category.entity';
import { Odej } from './odej.entity';
import { Wilaya } from './wilaya.entity';
import { Application } from './application.entity';
import { Badge } from './badge.entity';
export declare enum OpportunityStatus {
    OPEN = "open",
    CLOSED = "closed",
    COMPLETED = "completed"
}
export declare class Opportunity {
    id: string;
    title: string;
    description: string;
    category: Category;
    odej: Odej;
    wilaya: Wilaya;
    date: Date;
    duration: string;
    capacity: number;
    requirements: string[];
    locationLat: number;
    locationLng: number;
    status: OpportunityStatus;
    createdAt: Date;
    applications: Application[];
    badges: Badge[];
}
