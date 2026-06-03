import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { Opportunity } from '../entities/opportunity.entity';
import { User } from '../entities/user.entity';
export declare class ApplicationsService {
    private applicationRepository;
    private opportunityRepository;
    constructor(applicationRepository: Repository<Application>, opportunityRepository: Repository<Opportunity>);
    apply(user: User, opportunityId: string): Promise<Application>;
    findByMe(user: User): Promise<Application[]>;
    findByOdej(odejAdmin: User): Promise<Application[]>;
    updateStatus(id: string, status: ApplicationStatus): Promise<Application | null>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
