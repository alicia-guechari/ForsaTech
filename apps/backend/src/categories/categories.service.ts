import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService implements OnModuleInit {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }

    async onModuleInit() {
        const count = await this.categoriesRepository.count();
        if (count === 0) {
            const categories = [
                { name: 'Technology', icon: 'Code2', color: '#60a5fa' },
                { name: 'Environment', icon: 'Leaf', color: '#34d399' },
                { name: 'Sports', icon: 'Trophy', color: '#fbbf24' },
                { name: 'Volunteering', icon: 'Heart', color: '#f87171' },
                { name: 'Arts', icon: 'Palette', color: '#c084fc' },
                { name: 'Leadership', icon: 'Briefcase', color: '#38bdf8' },
                { name: 'Entrepreneurship', icon: 'Lightbulb', color: '#fb923c' },
                { name: 'Training', icon: 'GraduationCap', color: '#a3e635' },
            ];
            await this.categoriesRepository.save(categories);
        }
    }

    async findAll() {
        return this.categoriesRepository.find();
    }
}
