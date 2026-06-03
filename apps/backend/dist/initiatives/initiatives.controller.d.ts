import { InitiativesService } from './initiatives.service';
export declare class InitiativesController {
    private readonly initiativesService;
    constructor(initiativesService: InitiativesService);
    findAll(wilayaId?: number): Promise<import("../entities/initiative.entity").Initiative[]>;
    findOne(id: string): Promise<import("../entities/initiative.entity").Initiative | null>;
    create(req: any, data: any): Promise<import("../entities/initiative.entity").Initiative>;
    support(req: any, id: string): Promise<import("../entities/initiative.entity").Initiative | null>;
}
