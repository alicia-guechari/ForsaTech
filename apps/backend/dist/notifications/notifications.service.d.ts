import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { User } from '../entities/user.entity';
export declare class NotificationsService {
    private notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    create(user: User, type: string, payload: any): Promise<Notification>;
    findByMe(user: User): Promise<Notification[]>;
    markAsRead(id: string): Promise<import("typeorm").UpdateResult>;
    notifyAllSupporters(initiativeId: string, type: string, payload: any): Promise<void>;
}
