import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // Langkah 1: Registrasi calon anggota (Use Case UC1 pada blueprint)
  async register(dto: RegisterDto) {
    const existing = await this.prisma.anggota.findFirst({
      where: { OR: [{ email: dto.email }, { nik: dto.nik }] },
    });
    if (existing) {
      throw new ConflictException('Email atau NIK sudah terdaftar');
    }

    const role = await this.prisma.role.findUnique({ where: { nama: 'ANGGOTA' } });
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

  // Langkah 2: Login & penerbitan JWT (sesuai Sequence Diagram 6.3)
  async login(dto: LoginDto) {
    const anggota = await this.prisma.anggota.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });
    if (!anggota) throw new UnauthorizedException('Email atau password salah');

    const cocok = await bcrypt.compare(dto.password, anggota.passwordHash);
    if (!cocok) throw new UnauthorizedException('Email atau password salah');

    const payload = { sub: anggota.id, email: anggota.email, role: anggota.role.nama };
    const accessToken = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
    const refreshToken = this.jwt.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
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
}
