import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Odej } from '../entities/odej.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OdejService {
    constructor(
        @InjectRepository(Odej)
        private odejRepository: Repository<Odej>,
    ) { }

    async findByWilaya(wilayaId: number) {
        return this.odejRepository.find({
            where: { wilaya: { id: wilayaId } },
            relations: { wilaya: true },
        });
    }

    async findOne(id: string) {
        return this.odejRepository.findOne({
            where: { id },
            relations: { wilaya: true, opportunities: true, faqs: true },
        });
    }

    async findByAdmin(user: User) {
        return this.odejRepository.findOne({
            where: { adminUser: { id: user.id } },
            relations: { wilaya: true },
        });
    }

    async create(data: Partial<Odej>) {
        const odej = this.odejRepository.create(data);
        return this.odejRepository.save(odej);
    }

    async update(id: string, data: Partial<Odej>) {
        await this.odejRepository.update(id, data);
        return this.findOne(id);
    }
}
