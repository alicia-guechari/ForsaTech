"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WilayasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wilaya_entity_1 = require("../entities/wilaya.entity");
let WilayasService = class WilayasService {
    wilayasRepository;
    constructor(wilayasRepository) {
        this.wilayasRepository = wilayasRepository;
    }
    async onModuleInit() {
        const count = await this.wilayasRepository.count();
        if (count === 0) {
            const wilayas = [
                { id: 1, name: 'Adrar', code: '01' },
                { id: 2, name: 'Chlef', code: '02' },
                { id: 3, name: 'Laghouat', code: '03' },
                { id: 4, name: 'Oum El Bouaghi', code: '04' },
                { id: 5, name: 'Batna', code: '05' },
                { id: 6, name: 'Béjaïa', code: '06' },
                { id: 7, name: 'Biskra', code: '07' },
                { id: 8, name: 'Béchar', code: '08' },
                { id: 9, name: 'Blida', code: '09' },
                { id: 10, name: 'Bouira', code: '10' },
                { id: 11, name: 'Tamanrasset', code: '11' },
                { id: 12, name: 'Tébessa', code: '12' },
                { id: 13, name: 'Tlemcen', code: '13' },
                { id: 14, name: 'Tiaret', code: '14' },
                { id: 15, name: 'Tizi Ouzou', code: '15' },
                { id: 16, name: 'Alger', code: '16' },
                { id: 17, name: 'Djelfa', code: '17' },
                { id: 18, name: 'Jijel', code: '18' },
                { id: 19, name: 'Sétif', code: '19' },
                { id: 20, name: 'Saïda', code: '20' },
                { id: 21, name: 'Skikda', code: '21' },
                { id: 22, name: 'Sidi Bel Abbès', code: '22' },
                { id: 23, name: 'Annaba', code: '23' },
                { id: 24, name: 'Guelma', code: '24' },
                { id: 25, name: 'Constantine', code: '25' },
                { id: 26, name: 'Médéa', code: '26' },
                { id: 27, name: 'Mostaganem', code: '27' },
                { id: 28, name: "M'Sila", code: '28' },
                { id: 29, name: 'Mascara', code: '29' },
                { id: 30, name: 'Ouargla', code: '30' },
                { id: 31, name: 'Oran', code: '31' },
                { id: 32, name: 'El Bayadh', code: '32' },
                { id: 33, name: 'Illizi', code: '33' },
                { id: 34, name: 'Bordj Bou Arréridj', code: '34' },
                { id: 35, name: 'Boumerdès', code: '35' },
                { id: 36, name: 'El Tarf', code: '36' },
                { id: 37, name: 'Tindouf', code: '37' },
                { id: 38, name: 'Tissemsilt', code: '38' },
                { id: 39, name: 'El Oued', code: '39' },
                { id: 40, name: 'Khenchela', code: '40' },
                { id: 41, name: 'Souk Ahras', code: '41' },
                { id: 42, name: 'Tipaza', code: '42' },
                { id: 43, name: 'Mila', code: '43' },
                { id: 44, name: 'Aïn Defla', code: '44' },
                { id: 45, name: 'Naâma', code: '45' },
                { id: 46, name: 'Aïn Témouchent', code: '46' },
                { id: 47, name: 'Ghardaïa', code: '47' },
                { id: 48, name: 'Relizane', code: '48' },
                { id: 49, name: 'Timimoun', code: '49' },
                { id: 50, name: 'Bordj Badji Mokhtar', code: '50' },
                { id: 51, name: 'Ouled Djellal', code: '51' },
                { id: 52, name: 'Béni Abbès', code: '52' },
                { id: 53, name: 'In Salah', code: '53' },
                { id: 54, name: 'In Guezzam', code: '54' },
                { id: 55, name: 'Touggourt', code: '55' },
                { id: 56, name: 'Djanet', code: '56' },
                { id: 57, name: "El M'Ghair", code: '57' },
                { id: 58, name: 'El Meniaa', code: '58' },
            ];
            await this.wilayasRepository.save(wilayas);
        }
    }
    async findAll() {
        return this.wilayasRepository.find();
    }
};
exports.WilayasService = WilayasService;
exports.WilayasService = WilayasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wilaya_entity_1.Wilaya)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WilayasService);
//# sourceMappingURL=wilayas.service.js.map