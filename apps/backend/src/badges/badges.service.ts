import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '../entities/badge.entity';
import { User } from '../entities/user.entity';
import { Opportunity } from '../entities/opportunity.entity';
import * as crypto from 'crypto';

@Injectable()
export class BadgesService {
    constructor(
        @InjectRepository(Badge)
        private badgeRepository: Repository<Badge>,
    ) { }

    async award(user: User, opportunity: Opportunity) {
        const timestamp = new Date().toISOString();
        const hashInput = `${user.id}-${opportunity.id}-${timestamp}`;
        const hash = crypto.createHash('sha256').update(hashInput).digest('hex');

        const badge = this.badgeRepository.create({
            user,
            opportunity,
            category: opportunity.category,
            hash,
            svgTemplate: opportunity.category?.name?.toLowerCase() || 'default',
        });

        return this.badgeRepository.save(badge);
    }

    async findByMe(user: User) {
        return this.badgeRepository.find({
            where: { user: { id: user.id } },
            relations: { opportunity: true, category: true },
        });
    }
}
