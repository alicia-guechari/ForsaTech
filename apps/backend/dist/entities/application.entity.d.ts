import { User } from './user.entity';
import { Opportunity } from './opportunity.entity';
export declare enum ApplicationStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Application {
    id: string;
    user: User;
    opportunity: Opportunity;
    status: ApplicationStatus;
    appliedAt: Date;
}
