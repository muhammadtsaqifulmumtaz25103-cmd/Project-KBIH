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
exports.JadwalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let JadwalService = class JadwalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.jadwalKegiatan.findMany({
            include: { kegiatan: true },
            orderBy: { tanggalMulai: 'asc' },
        });
    }
    async findOne(id) {
        const jadwal = await this.prisma.jadwalKegiatan.findUnique({
            where: { id },
            include: { kegiatan: true },
        });
        if (!jadwal)
            throw new common_1.NotFoundException('Jadwal tidak ditemukan');
        return jadwal;
    }
    create(dto) {
        if (new Date(dto.tanggalSelesai) < new Date(dto.tanggalMulai)) {
            throw new common_1.BadRequestException('Tanggal selesai tidak boleh sebelum tanggal mulai');
        }
        return this.prisma.jadwalKegiatan.create({
            data: {
                tanggalMulai: new Date(dto.tanggalMulai),
                tanggalSelesai: new Date(dto.tanggalSelesai),
                kuota: dto.kuota,
                lokasi: dto.lokasi,
                kegiatan: dto.kegiatanIds ? { connect: dto.kegiatanIds.map((id) => ({ id })) } : undefined,
            },
            include: { kegiatan: true },
        });
    }
    async cekKetersediaan(jadwalId) {
        const jadwal = await this.findOne(jadwalId);
        if (jadwal.kuotaTerisi >= jadwal.kuota) {
            throw new common_1.BadRequestException('Kuota jadwal ini sudah penuh');
        }
        return jadwal;
    }
    async tambahKuotaTerisi(jadwalId) {
        return this.prisma.jadwalKegiatan.update({
            where: { id: jadwalId },
            data: { kuotaTerisi: { increment: 1 } },
        });
    }
};
exports.JadwalService = JadwalService;
exports.JadwalService = JadwalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JadwalService);
//# sourceMappingURL=jadwal.service.js.map