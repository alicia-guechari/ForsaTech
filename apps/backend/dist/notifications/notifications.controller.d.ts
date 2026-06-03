import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findByMe(req: any): Promise<import("../entities/notification.entity").Notification[]>;
    markAsRead(id: string): Promise<import("typeorm").UpdateResult>;
}
