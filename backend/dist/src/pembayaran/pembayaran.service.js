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
exports.PembayaranService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pendaftaran_service_1 = require("../pendaftaran/pendaftaran.service");
let PembayaranService = class PembayaranService {
    constructor(prisma, pendaftaranService) {
        this.prisma = prisma;
        this.pendaftaranService = pendaftaranService;
    }
    async handleCallback(payload) {
        const pembayaran = await this.prisma.pembayaran.findUnique({
            where: { id: payload.pembayaranId },
        });
        if (!pembayaran)
            throw new common_1.NotFoundException('Data pembayaran tidak ditemukan');
        const updated = await this.prisma.pembayaran.update({
            where: { id: payload.pembayaranId },
            data: {
                statusBayar: payload.statusBayar,
                metode: payload.metode,
                referensiExternal: payload.referensiExternal,
                tanggalBayar: payload.statusBayar === 'PAID' ? new Date() : null,
            },
        });
        if (payload.statusBayar === 'PAID') {
            await this.pendaftaranService.konfirmasiSetelahBayar(pembayaran.pendaftaranId);
        }
        return updated;
    }
};
exports.PembayaranService = PembayaranService;
exports.PembayaranService = PembayaranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pendaftaran_service_1.PendaftaranService])
], PembayaranService);
//# sourceMappingURL=pembayaran.service.js.map