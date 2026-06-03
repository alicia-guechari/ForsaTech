import { OdejService } from './odej.service';
export declare class OdejController {
    private readonly odejService;
    constructor(odejService: OdejService);
    findAll(wilayaId?: number): never[] | Promise<import("../entities/odej.entity").Odej[]>;
    findMe(req: any): Promise<import("../entities/odej.entity").Odej | null>;
    findOne(id: string): Promise<import("../entities/odej.entity").Odej | null>;
    create(data: any): Promise<import("../entities/odej.entity").Odej>;
    update(id: string, data: any): Promise<import("../entities/odej.entity").Odej | null>;
}
