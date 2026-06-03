import { Repository } from 'typeorm';
import { Initiative } from '../entities/initiative.entity';
import { InitiativeSupport } from '../entities/initiative-support.entity';
import { User } from '../entities/user.entity';
export declare class InitiativesService {
    private initiativeRepository;
    private supportRepository;
    constructor(initiativeRepository: Repository<Initiative>, supportRepository: Repository<InitiativeSupport>);
    findAll(wilayaId?: number): Promise<Initiative[]>;
    findOne(id: string): Promise<Initiative | null>;
    create(user: User, data: Partial<Initiative>): Promise<Initiative>;
    support(user: User, initiativeId: string): Promise<Initiative | null>;
}
