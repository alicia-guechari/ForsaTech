import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { Opportunity, OpportunityStatus } from '../entities/opportunity.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
        @InjectRepository(Opportunity)
        private opportunityRepository: Repository<Opportunity>,
    ) { }

    async apply(user: User, opportunityId: string) {
        const opp = await this.opportunityRepository.findOne({
            where: { id: opportunityId },
            relations: { applications: true },
        });

        if (!opp) throw new BadRequestException('Opportunity not found');
        if (opp.status !== OpportunityStatus.OPEN) throw new BadRequestException('Opportunity is not open');

        if (opp.applications.length >= opp.capacity) {
            throw new BadRequestException('Opportunity is full');
        }

        const existing = await this.applicationRepository.findOneBy({
            user: { id: user.id },
            opportunity: { id: opportunityId },
        });

        if (existing) throw new BadRequestException('You already applied');

        const app = this.applicationRepository.create({
            user,
            opportunity: opp,
        });

        return this.applicationRepository.save(app);
    }

    async findByMe(user: User) {
        return this.applicationRepository.find({
            where: { user: { id: user.id } },
            relations: { opportunity: { category: true } },
        });
    }

    async findByOdej(odejAdmin: User) {
        // This logic assumes we can find the ODEJ linked to this admin user
        return this.applicationRepository.find({
            relations: { user: true, opportunity: true },
            where: { opportunity: { odej: { adminUser: { id: odejAdmin.id } } } },
        });
    }

    async updateStatus(id: string, status: ApplicationStatus) {
        await this.applicationRepository.update(id, { status });
        return this.applicationRepository.findOneBy({ id });
    }

    async delete(id: string) {
        const app = await this.applicationRepository.findOneBy({ id });
        if (!app) throw new BadRequestException('Application not found');
        await this.applicationRepository.delete(id);
        return { success: true };
    }
}
