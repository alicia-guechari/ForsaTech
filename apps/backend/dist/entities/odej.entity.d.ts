import { Wilaya } from './wilaya.entity';
import { Opportunity } from './opportunity.entity';
import { Faq } from './faq.entity';
import { User } from './user.entity';
export declare class Odej {
    id: string;
    wilaya: Wilaya;
    contactEmail: string;
    contactPhone: string;
    description: string;
    openingHours: any;
    opportunities: Opportunity[];
    faqs: Faq[];
    adminUser: User;
}
