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
exports.PendaftaranService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jadwal_service_1 = require("../jadwal/jadwal.service");
const BIAYA_PELATIHAN = 500000;
let PendaftaranService = class PendaftaranService {
    constructor(prisma, jadwalService) {
        this.prisma = prisma;
        this.jadwalService = jadwalService;
    }
    async create(anggotaId, dto) {
        const anggota = await this.prisma.anggota.findUnique({ where: { id: anggotaId } });
        if (!anggota) {
            throw new common_1.NotFoundException('Anggota tidak ditemukan');
        }
        if (anggota.statusKeanggotaan !== 'AKTIF') {
            throw new common_1.BadRequestException('Keanggotaan Anda belum aktif. Selesaikan verifikasi dokumen terlebih dahulu.');
        }
        await this.jadwalService.cekKetersediaan(dto.jadwalId);
        const sudahDaftar = await this.prisma.pendaftaran.findUnique({
            where: { anggotaId_jadwalId: { anggotaId, jadwalId: dto.jadwalId } },
        });
        if (sudahDaftar) {
            throw new common_1.BadRequestException('Anda sudah terdaftar pada jadwal ini');
        }
        const pendaftaran = await this.prisma.pendaftaran.create({
            data: { anggotaId, jadwalId: dto.jadwalId, status: 'MENUNGGU_PEMBAYARAN' },
        });
        const pembayaran = await this.prisma.pembayaran.create({
            data: {
                pendaftaranId: pendaftaran.id,
                jumlah: BIAYA_PELATIHAN,
                statusBayar: 'PENDING',
            },
        });
        return {
            pendaftaranId: pendaftaran.id,
            pembayaranId: pembayaran.id,
            jumlah: pembayaran.jumlah,
            status: pendaftaran.status,
            pesan: 'Silakan lanjutkan ke halaman pembayaran.',
        };
    }
    findByAnggota(anggotaId) {
        return this.prisma.pendaftaran.findMany({
            where: { anggotaId },
            include: { jadwal: true, pembayaran: true },
            orderBy: { tanggalDaftar: 'desc' },
        });
    }
    async findOne(id) {
        const pendaftaran = await this.prisma.pendaftaran.findUnique({
            where: { id },
            include: { jadwal: true, pembayaran: true, anggota: true },
        });
        if (!pendaftaran)
            throw new common_1.NotFoundException('Pendaftaran tidak ditemukan');
        return pendaftaran;
    }
    async konfirmasiSetelahBayar(pendaftaranId) {
        const pendaftaran = await this.prisma.pendaftaran.update({
            where: { id: pendaftaranId },
            data: { status: 'TERKONFIRMASI' },
        });
        await this.jadwalService.tambahKuotaTerisi(pendaftaran.jadwalId);
        return pendaftaran;
    }
};
exports.PendaftaranService = PendaftaranService;
exports.PendaftaranService = PendaftaranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jadwal_service_1.JadwalService])
], PendaftaranService);
//# sourceMappingURL=pendaftaran.service.js.map