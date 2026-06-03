import { User } from './user.entity';
export declare class Notification {
    id: string;
    user: User;
    type: string;
    payload: any;
    isRead: boolean;
    createdAt: Date;
}
