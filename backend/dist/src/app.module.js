"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const anggota_module_1 = require("./anggota/anggota.module");
const jadwal_module_1 = require("./jadwal/jadwal.module");
const kegiatan_module_1 = require("./kegiatan/kegiatan.module");
const pendaftaran_module_1 = require("./pendaftaran/pendaftaran.module");
const benefit_module_1 = require("./benefit/benefit.module");
const profil_module_1 = require("./profil/profil.module");
const pembayaran_module_1 = require("./pembayaran/pembayaran.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            anggota_module_1.AnggotaModule,
            jadwal_module_1.JadwalModule,
            kegiatan_module_1.KegiatanModule,
            pendaftaran_module_1.PendaftaranModule,
            benefit_module_1.BenefitModule,
            profil_module_1.ProfilModule,
            pembayaran_module_1.PembayaranModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map