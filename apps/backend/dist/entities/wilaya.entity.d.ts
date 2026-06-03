import { User } from './user.entity';
import { Odej } from './odej.entity';
import { Opportunity } from './opportunity.entity';
import { Initiative } from './initiative.entity';
export declare class Wilaya {
    id: number;
    name: string;
    code: string;
    users: User[];
    odejs: Odej[];
    opportunities: Opportunity[];
    initiatives: Initiative[];
}
