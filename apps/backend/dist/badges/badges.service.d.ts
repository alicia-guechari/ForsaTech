import { Repository } from 'typeorm';
import { Badge } from '../entities/badge.entity';
import { User } from '../entities/user.entity';
import { Opportunity } from '../entities/opportunity.entity';
export declare class BadgesService {
    private badgeRepository;
    constructor(badgeRepository: Repository<Badge>);
    award(user: User, opportunity: Opportunity): Promise<Badge>;
    findByMe(user: User): Promise<Badge[]>;
}
