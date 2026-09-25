import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AnggotaModule } from './anggota/anggota.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { KegiatanModule } from './kegiatan/kegiatan.module';
import { PendaftaranModule } from './pendaftaran/pendaftaran.module';
import { BenefitModule } from './benefit/benefit.module';
import { ProfilModule } from './profil/profil.module';
import { PembayaranModule } from './pembayaran/pembayaran.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AnggotaModule,
    JadwalModule,
    KegiatanModule,
    PendaftaranModule,
    BenefitModule,
    ProfilModule,
    PembayaranModule,
  ],
})
export class AppModule {}
