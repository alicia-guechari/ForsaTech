import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Initiative, InitiativeStatus } from '../entities/initiative.entity';
import { InitiativeSupport } from '../entities/initiative-support.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class InitiativesService {
    constructor(
        @InjectRepository(Initiative)
        private initiativeRepository: Repository<Initiative>,
        @InjectRepository(InitiativeSupport)
        private supportRepository: Repository<InitiativeSupport>,
    ) { }

    async findAll(wilayaId?: number) {
        const query = this.initiativeRepository.createQueryBuilder('init')
            .leftJoinAndSelect('init.user', 'user')
            .leftJoinAndSelect('init.wilaya', 'wilaya')
            .orderBy('init.createdAt', 'DESC');

        if (wilayaId) {
            query.andWhere('wilaya.id = :wilayaId', { wilayaId });
        }

        return query.getMany();
    }

    async findOne(id: string) {
        return this.initiativeRepository.findOne({
            where: { id },
            relations: { user: true, wilaya: true, supports: true, comments: true },
        });
    }

    async create(user: User, data: Partial<Initiative>) {
        const initiative = this.initiativeRepository.create({
            ...data,
            user,
        });
        return this.initiativeRepository.save(initiative);
    }

    async support(user: User, initiativeId: string) {
        const initiative = await this.initiativeRepository.findOneBy({ id: initiativeId });
        if (!initiative) throw new BadRequestException('Initiative not found');

        const existingSupport = await this.supportRepository.findOneBy({
            user: { id: user.id },
            initiative: { id: initiativeId },
        });

        if (existingSupport) {
            throw new BadRequestException('You already supported this initiative');
        }

        const support = this.supportRepository.create({ user, initiative });
        await this.supportRepository.save(support);

        // Atomic increment
        await this.initiativeRepository.increment({ id: initiativeId }, 'supportCount', 1);

        // Check threshold
        const updated = await this.initiativeRepository.findOneBy({ id: initiativeId });
        if (updated && updated.supportCount >= updated.threshold && updated.status === InitiativeStatus.PENDING) {
            // Trigger notification logic here
            console.log(`Initiative ${initiativeId} reached threshold! Notifying ODEJ...`);
        }

        return updated;
    }
}
