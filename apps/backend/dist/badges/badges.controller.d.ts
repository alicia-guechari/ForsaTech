import { BadgesService } from './badges.service';
export declare class BadgesController {
    private readonly badgesService;
    constructor(badgesService: BadgesService);
    findByMe(req: any): Promise<import("../entities/badge.entity").Badge[]>;
}
