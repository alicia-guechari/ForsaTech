import { User } from './user.entity';
import { Wilaya } from './wilaya.entity';
import { InitiativeSupport } from './initiative-support.entity';
import { Comment } from './comment.entity';
export declare enum InitiativeStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Initiative {
    id: string;
    user: User;
    title: string;
    description: string;
    wilaya: Wilaya;
    threshold: number;
    supportCount: number;
    status: InitiativeStatus;
    odejResponse: string;
    linkedOpportunityId: string;
    createdAt: Date;
    supports: InitiativeSupport[];
    comments: Comment[];
}
