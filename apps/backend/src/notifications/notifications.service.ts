import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
    ) { }

    async create(user: User, type: string, payload: any) {
        const notification = this.notificationRepository.create({
            user,
            type,
            payload,
        });
        return this.notificationRepository.save(notification);
    }

    async findByMe(user: User) {
        return this.notificationRepository.find({
            where: { user: { id: user.id } },
            order: { createdAt: 'DESC' },
            take: 20,
        });
    }

    async markAsRead(id: string) {
        return this.notificationRepository.update(id, { isRead: true });
    }

    async notifyAllSupporters(initiativeId: string, type: string, payload: any) {
        // This would fetch all supporters and create notifications for them
        // Sticking to simplified logic for now
        console.log(`Notifying all supporters of initiative ${initiativeId} with type ${type}`);
    }
}
