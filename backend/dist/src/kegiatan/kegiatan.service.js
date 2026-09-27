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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KegiatanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let KegiatanService = class KegiatanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.kegiatan.findMany({ include: { kategori: true } });
    }
    async findOne(id) {
        const kegiatan = await this.prisma.kegiatan.findUnique({
            where: { id },
            include: { kategori: true },
        });
        if (!kegiatan)
            throw new common_1.NotFoundException('Kegiatan tidak ditemukan');
        return kegiatan;
    }
    create(dto) {
        return this.prisma.kegiatan.create({ data: dto });
    }
    findAllKategori() {
        return this.prisma.kategoriKegiatan.findMany();
    }
};
exports.KegiatanService = KegiatanService;
exports.KegiatanService = KegiatanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KegiatanService);
//# sourceMappingURL=kegiatan.service.js.map