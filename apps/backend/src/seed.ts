import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Wilaya } from './entities/wilaya.entity';
import { Category } from './entities/category.entity';
import { User, UserRole } from './entities/user.entity';
import { Odej } from './entities/odej.entity';
import { Opportunity, OpportunityStatus } from './entities/opportunity.entity';
import { Application, ApplicationStatus } from './entities/application.entity';
import { Badge } from './entities/badge.entity';
import { Notification } from './entities/notification.entity';
import { Comment } from './entities/comment.entity';
import { Initiative } from './entities/initiative.entity';
import { InitiativeSupport } from './entities/initiative-support.entity';
import { Faq } from './entities/faq.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'forsatech',
    entities: [
        Wilaya, Category, User, Odej, Opportunity, Application,
        Badge, Notification, Comment, Initiative, InitiativeSupport, Faq
    ],
    synchronize: true,
});

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log('✅ Database connected');

        // Clear existing data (with error handling)
        try {
            await AppDataSource.query('TRUNCATE TABLE applications, opportunities, odej, "user", categories, wilayas CASCADE');
            console.log('🗑️  Cleared existing data');
        } catch (e) {
            console.log('ℹ️  No existing data to clear (tables being created)');
        }

        // 1. Create Wilayas
        const wilayasData = [
            { name: 'Alger', code: 'ALG' },
            { name: 'Béjaïa', code: 'BJA' },
            { name: 'Constantine', code: 'CST' },
            { name: 'Oran', code: 'ORA' },
            { name: 'Annaba', code: 'ANN' },
        ];

        const wilayas = await AppDataSource.getRepository(Wilaya).save(
            wilayasData.map((w) => AppDataSource.getRepository(Wilaya).create(w))
        );
        console.log(`✅ Created ${wilayas.length} wilayas`);

        // 2. Create Categories
        const categoriesData = [
            { name: 'Technology', icon: '💻', color: '#60a5fa' },
            { name: 'Environment', icon: '🌱', color: '#34d399' },
            { name: 'Sports', icon: '⚽', color: '#fbbf24' },
            { name: 'Volunteering', icon: '❤️', color: '#f87171' },
            { name: 'Leadership', icon: '👔', color: '#38bdf8' },
        ];

        const categories = await AppDataSource.getRepository(Category).save(
            categoriesData.map((c) => AppDataSource.getRepository(Category).create(c))
        );
        console.log(`✅ Created ${categories.length} categories`);

        // 3. Create Youth Users
        const youthUsersData = [
            { email: 'ahmed.youth@test.com', name: 'Ahmed', interests: ['Technology', 'Sports'] },
            { email: 'fatima.youth@test.com', name: 'Fatima', interests: ['Environment', 'Volunteering'] },
            { email: 'karim.youth@test.com', name: 'Karim', interests: ['Leadership', 'Technology'] },
            { email: 'sara.youth@test.com', name: 'Sara', interests: ['Sports', 'Environment'] },
        ];

        const youthUsers = await Promise.all(
            youthUsersData.map(async (u) => {
                const user = AppDataSource.getRepository(User).create({
                    email: u.email,
                    name: u.name,
                    passwordHash: await bcrypt.hash('password123', 10),
                    role: UserRole.YOUTH,
                    interests: u.interests,
                    wilaya: wilayas[Math.floor(Math.random() * wilayas.length)],
                });
                return AppDataSource.getRepository(User).save(user);
            })
        );
        console.log(`✅ Created ${youthUsers.length} youth users`);

        // 4. Create ODEJ Users and Organizations
        const odejUsersData = [
            { email: 'odej.alger@test.com', name: 'ODEJ Alger', wilayaIdx: 0 },
            { email: 'odej.bejaia@test.com', name: 'ODEJ Béjaïa', wilayaIdx: 1 },
            { email: 'odej.constantine@test.com', name: 'ODEJ Constantine', wilayaIdx: 2 },
        ];

        const odejUsers = await Promise.all(
            odejUsersData.map(async (u) => {
                const user = AppDataSource.getRepository(User).create({
                    email: u.email,
                    name: u.name,
                    passwordHash: await bcrypt.hash('password123', 10),
                    role: UserRole.ODEJ,
                    interests: ['Leadership'],
                    wilaya: wilayas[u.wilayaIdx],
                });
                return AppDataSource.getRepository(User).save(user);
            })
        );
        console.log(`✅ Created ${odejUsers.length} ODEJ users`);

        // 5. Create ODEJ Organizations
        const odejOrgsData = [
            { email: 'contact@odej-alger.org', phone: '+213 1 234 5678', description: 'ODEJ Alger - Youth organization for technology and innovation' },
            { email: 'contact@odej-bejaia.org', phone: '+213 34 567 8901', description: 'ODEJ Béjaïa - Environmental and cultural youth development' },
            { email: 'contact@odej-constantine.org', phone: '+213 31 234 5678', description: 'ODEJ Constantine - Sports and community engagement' },
        ];

        const odejOrgs = await Promise.all(
            odejUsersData.map(async (u, idx) => {
                const org = AppDataSource.getRepository(Odej).create({
                    wilaya: wilayas[u.wilayaIdx],
                    contactEmail: odejOrgsData[idx].email,
                    contactPhone: odejOrgsData[idx].phone,
                    description: odejOrgsData[idx].description,
                    adminUser: odejUsers[idx],
                });
                return AppDataSource.getRepository(Odej).save(org);
            })
        );
        console.log(`✅ Created ${odejOrgs.length} ODEJ organizations`);

        // 6. Create Opportunities
        const opportunitiesData = [
            {
                title: 'National Robotics & AI Championship',
                description: 'Compete in teams of 3-5 to design and program autonomous robots. All levels welcome.',
                category: categories[0], // Technology
                odej: odejOrgs[0],
                wilaya: wilayas[0], // Alger
                date: new Date('2026-07-15'),
                duration: '2 days',
                capacity: 120,
                requirements: ['Age 16-35', 'Basic programming knowledge', 'Team of 3-5 members'],
            },
            {
                title: 'Reforestation Volunteer Day – Kabylie',
                description: 'Join thousands of volunteers to plant trees across the forests of Kabylie.',
                category: categories[1], // Environment
                odej: odejOrgs[1],
                wilaya: wilayas[1], // Béjaïa
                date: new Date('2026-07-08'),
                duration: '1 day',
                capacity: 80,
                requirements: ['Physical fitness', 'Willingness to work outdoors', 'Age 16+'],
            },
            {
                title: 'Regional Youth Football Tournament',
                description: 'Inter-wilaya football tournament open to youth aged 16-25.',
                category: categories[2], // Sports
                odej: odejOrgs[2],
                wilaya: wilayas[2], // Constantine
                date: new Date('2026-07-20'),
                duration: '3 days',
                capacity: 200,
                requirements: ['Age 16-25', 'Football experience', 'Team registration required'],
            },
            {
                title: 'Web Development Bootcamp',
                description: 'Intensive 4-week bootcamp covering React, Node.js, and modern web technologies.',
                category: categories[0], // Technology
                odej: odejOrgs[0],
                wilaya: wilayas[0], // Alger
                date: new Date('2026-08-01'),
                duration: '4 weeks',
                capacity: 50,
                requirements: ['Laptop required', 'Basic JavaScript knowledge', 'Full-time commitment'],
            },
            {
                title: 'Environmental Leadership Workshop',
                description: 'Learn about climate change, sustainability, and environmental advocacy.',
                category: categories[1], // Environment
                odej: odejOrgs[1],
                wilaya: wilayas[1], // Béjaïa
                date: new Date('2026-07-25'),
                duration: '3 days',
                capacity: 60,
                requirements: ['Interest in environment', 'Age 18+', 'Active participation'],
            },
            {
                title: 'Community Volunteering Program',
                description: 'Help underprivileged communities with educational support and mentoring.',
                category: categories[3], // Volunteering
                odej: odejOrgs[2],
                wilaya: wilayas[2], // Constantine
                date: new Date('2026-06-15'),
                duration: '2 months',
                capacity: 40,
                requirements: ['Commitment to community service', 'Age 16+', 'Regular availability'],
            },
        ];

        const opportunities = await Promise.all(
            opportunitiesData.map((o) => {
                const opp = AppDataSource.getRepository(Opportunity).create({
                    title: o.title,
                    description: o.description,
                    category: o.category,
                    odej: o.odej,
                    wilaya: o.wilaya,
                    date: o.date,
                    duration: o.duration,
                    capacity: o.capacity,
                    requirements: o.requirements,
                    status: OpportunityStatus.OPEN,
                });
                return AppDataSource.getRepository(Opportunity).save(opp);
            })
        );
        console.log(`✅ Created ${opportunities.length} opportunities`);

        // 7. Create Applications (Youth users applying to opportunities)
        const applicationsData = [
            { userIdx: 0, oppIdx: 0, status: ApplicationStatus.PENDING },
            { userIdx: 0, oppIdx: 3, status: ApplicationStatus.APPROVED },
            { userIdx: 1, oppIdx: 1, status: ApplicationStatus.PENDING },
            { userIdx: 1, oppIdx: 4, status: ApplicationStatus.APPROVED },
            { userIdx: 2, oppIdx: 2, status: ApplicationStatus.PENDING },
            { userIdx: 2, oppIdx: 0, status: ApplicationStatus.REJECTED },
            { userIdx: 3, oppIdx: 1, status: ApplicationStatus.PENDING },
            { userIdx: 3, oppIdx: 5, status: ApplicationStatus.APPROVED },
        ];

        const applications = await Promise.all(
            applicationsData.map((a) => {
                const app = AppDataSource.getRepository(Application).create({
                    user: youthUsers[a.userIdx],
                    opportunity: opportunities[a.oppIdx],
                    status: a.status,
                });
                return AppDataSource.getRepository(Application).save(app);
            })
        );
        console.log(`✅ Created ${applications.length} applications`);

        console.log('\n✨ Seeding completed successfully!');
        await AppDataSource.destroy();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
