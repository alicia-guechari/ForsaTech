import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            relations: { wilaya: true },
            select: { id: true, email: true, passwordHash: true, name: true, role: true, interests: true },
        });
    }

    async findOneById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: { wilaya: true, badges: true, applications: true },
        });
    }

    async create(userData: Partial<User>): Promise<User> {
        const salt = await bcrypt.genSalt();
        if (userData.passwordHash) {
            userData.passwordHash = await bcrypt.hash(userData.passwordHash, salt);
        }
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async update(id: string, updateData: Partial<User>): Promise<User | null> {
        await this.usersRepository.update(id, updateData);
        return this.findOneById(id);
    }
}
