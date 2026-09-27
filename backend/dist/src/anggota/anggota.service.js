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
exports.AnggotaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnggotaService = class AnggotaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findMe(anggotaId) {
        const anggota = await this.prisma.anggota.findUnique({
            where: { id: anggotaId },
            include: { role: true, dokumen: true },
        });
        if (!anggota)
            throw new common_1.NotFoundException('Anggota tidak ditemukan');
        const { passwordHash, ...safe } = anggota;
        return safe;
    }
    async uploadDokumen(anggotaId, jenisDokumen, urlFile) {
        return this.prisma.dokumen.create({
            data: { anggotaId, jenisDokumen, urlFile, statusVerifikasi: 'MENUNGGU' },
        });
    }
    async verifikasiDokumen(dokumenId, disetujui) {
        const dokumen = await this.prisma.dokumen.update({
            where: { id: dokumenId },
            data: { statusVerifikasi: disetujui ? 'DISETUJUI' : 'DITOLAK' },
        });
        if (disetujui) {
            const semuaDokumen = await this.prisma.dokumen.findMany({
                where: { anggotaId: dokumen.anggotaId },
            });
            const semuaDisetujui = semuaDokumen.every((d) => d.statusVerifikasi === 'DISETUJUI');
            if (semuaDisetujui) {
                await this.prisma.anggota.update({
                    where: { id: dokumen.anggotaId },
                    data: { statusKeanggotaan: 'AKTIF' },
                });
            }
        }
        else {
            await this.prisma.anggota.update({
                where: { id: dokumen.anggotaId },
                data: { statusKeanggotaan: 'DITOLAK' },
            });
        }
        return dokumen;
    }
    async findAll() {
        const list = await this.prisma.anggota.findMany({
            include: { role: true },
            orderBy: { createdAt: 'desc' },
        });
        return list.map(({ passwordHash, ...safe }) => safe);
    }
};
exports.AnggotaService = AnggotaService;
exports.AnggotaService = AnggotaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnggotaService);
//# sourceMappingURL=anggota.service.js.map