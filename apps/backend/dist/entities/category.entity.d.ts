import { Opportunity } from './opportunity.entity';
import { Badge } from './badge.entity';
export declare class Category {
    id: number;
    name: string;
    icon: string;
    color: string;
    opportunities: Opportunity[];
    badges: Badge[];
}
