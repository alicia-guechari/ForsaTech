import { User } from './user.entity';
import { Initiative } from './initiative.entity';
export declare class InitiativeSupport {
    id: number;
    user: User;
    initiative: Initiative;
    createdAt: Date;
}
