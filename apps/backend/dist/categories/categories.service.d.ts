import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
export declare class CategoriesService implements OnModuleInit {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Category[]>;
}
