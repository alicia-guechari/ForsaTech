import { User } from './user.entity';
import { Initiative } from './initiative.entity';
export declare class Comment {
    id: string;
    user: User;
    initiative: Initiative;
    content: string;
    createdAt: Date;
}
