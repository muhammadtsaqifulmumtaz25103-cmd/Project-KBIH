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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const existing = await this.prisma.anggota.findFirst({
            where: { OR: [{ email: dto.email }, { nik: dto.nik }] },
        });
        if (existing) {
            throw new common_1.ConflictException('Email atau NIK sudah terdaftar');
        }
        const role = await this.prisma.role.findUnique({ where: { nama: 'ANGGOTA' } });
        if (!role) {
            throw new common_1.InternalServerErrorException('Role ANGGOTA belum tersedia. Jalankan seed database terlebih dahulu.');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const anggota = await this.prisma.anggota.create({
            data: {
                nik: dto.nik,
                namaLengkap: dto.namaLengkap,
                email: dto.email,
                noHp: dto.noHp,
                passwordHash,
                roleId: role.id,
                statusKeanggotaan: 'MENUNGGU_VERIFIKASI',
            },
        });
        return {
            message: 'Registrasi berhasil. Silakan unggah dokumen persyaratan untuk verifikasi.',
            anggotaId: anggota.id,
        };
    }
    async login(dto) {
        const anggota = await this.prisma.anggota.findUnique({
            where: { email: dto.email },
            include: { role: true },
        });
        if (!anggota)
            throw new common_1.UnauthorizedException('Email atau password salah');
        const cocok = await bcrypt.compare(dto.password, anggota.passwordHash);
        if (!cocok)
            throw new common_1.UnauthorizedException('Email atau password salah');
        if (!anggota.role) {
            throw new common_1.InternalServerErrorException('Data role anggota tidak ditemukan.');
        }
        const payload = { sub: anggota.id, email: anggota.email, role: anggota.role.nama };
        const jwtSecret = process.env.JWT_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!jwtSecret || !refreshSecret) {
            throw new common_1.InternalServerErrorException('JWT secret belum dikonfigurasi di environment variable.');
        }
        const accessToken = this.jwt.sign(payload, {
            secret: jwtSecret,
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        });
        const refreshToken = this.jwt.sign(payload, {
            secret: refreshSecret,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        });
        return {
            accessToken,
            refreshToken,
            profil: {
                id: anggota.id,
                nama: anggota.namaLengkap,
                email: anggota.email,
                role: anggota.role.nama,
                status: anggota.statusKeanggotaan,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map