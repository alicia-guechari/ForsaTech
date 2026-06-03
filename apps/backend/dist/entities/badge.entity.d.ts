import { User } from './user.entity';
import { Opportunity } from './opportunity.entity';
import { Category } from './category.entity';
export declare class Badge {
    id: string;
    user: User;
    opportunity: Opportunity;
    category: Category;
    hash: string;
    svgTemplate: string;
    awardedAt: Date;
}
