import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnggotaService {
  constructor(private prisma: PrismaService) {}

  // Lihat profil sendiri
  async findMe(anggotaId: string) {
    const anggota = await this.prisma.anggota.findUnique({
      where: { id: anggotaId },
      include: { role: true, dokumen: true },
    });
    if (!anggota) throw new NotFoundException('Anggota tidak ditemukan');
    const { passwordHash, ...safe } = anggota;
    return safe;
  }

  // Langkah 2 (Activity Diagram 6.4): upload dokumen persyaratan
  async uploadDokumen(anggotaId: string, jenisDokumen: string, urlFile: string) {
    return this.prisma.dokumen.create({
      data: { anggotaId, jenisDokumen, urlFile, statusVerifikasi: 'MENUNGGU' },
    });
  }

  // Admin: verifikasi dokumen & aktivasi keanggotaan (UC9)
  async verifikasiDokumen(dokumenId: string, disetujui: boolean) {
    const dokumen = await this.prisma.dokumen.update({
      where: { id: dokumenId },
      data: { statusVerifikasi: disetujui ? 'DISETUJUI' : 'DITOLAK' },
    });

    if (disetujui) {
      // Jika semua dokumen wajib sudah disetujui, aktifkan keanggotaan
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
    } else {
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
}
