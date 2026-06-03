import { Repository } from 'typeorm';
import { Odej } from '../entities/odej.entity';
import { User } from '../entities/user.entity';
export declare class OdejService {
    private odejRepository;
    constructor(odejRepository: Repository<Odej>);
    findByWilaya(wilayaId: number): Promise<Odej[]>;
    findOne(id: string): Promise<Odej | null>;
    findByAdmin(user: User): Promise<Odej | null>;
    create(data: Partial<Odej>): Promise<Odej>;
    update(id: string, data: Partial<Odej>): Promise<Odej | null>;
}
