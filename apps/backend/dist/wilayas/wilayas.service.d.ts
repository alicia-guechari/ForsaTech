import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wilaya } from '../entities/wilaya.entity';
export declare class WilayasService implements OnModuleInit {
    private readonly wilayasRepository;
    constructor(wilayasRepository: Repository<Wilaya>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Wilaya[]>;
}
