import { ApplicationsService } from './applications.service';
import { ApplicationStatus } from '../entities/application.entity';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(req: any, oppId: string): Promise<import("../entities/application.entity").Application>;
    findByMe(req: any): Promise<import("../entities/application.entity").Application[]>;
    findByOdej(req: any): Promise<import("../entities/application.entity").Application[]>;
    updateStatus(id: string, status: ApplicationStatus): Promise<import("../entities/application.entity").Application | null>;
}
