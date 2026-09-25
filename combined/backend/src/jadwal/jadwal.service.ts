import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';

@Injectable()
export class JadwalService {
  constructor(private prisma: PrismaService) {}

  // Publik & Anggota: daftar jadwal kegiatan (Modul 2 pada blueprint)
  findAll() {
    return this.prisma.jadwalKegiatan.findMany({
      include: { kegiatan: true },
      orderBy: { tanggalMulai: 'asc' },
    });
  }

  async findOne(id: string) {
    const jadwal = await this.prisma.jadwalKegiatan.findUnique({
      where: { id },
      include: { kegiatan: true },
    });
    if (!jadwal) throw new NotFoundException('Jadwal tidak ditemukan');
    return jadwal;
  }

  // Admin: buat jadwal baru (UC8)
  create(dto: CreateJadwalDto) {
    if (new Date(dto.tanggalSelesai) < new Date(dto.tanggalMulai)) {
      throw new BadRequestException('Tanggal selesai tidak boleh sebelum tanggal mulai');
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

  // Dipakai PendaftaranService untuk cek & menambah kuota terisi
  async cekKetersediaan(jadwalId: string) {
    const jadwal = await this.findOne(jadwalId);
    if (jadwal.kuotaTerisi >= jadwal.kuota) {
      throw new BadRequestException('Kuota jadwal ini sudah penuh');
    }
    return jadwal;
  }

  async tambahKuotaTerisi(jadwalId: string) {
    return this.prisma.jadwalKegiatan.update({
      where: { id: jadwalId },
      data: { kuotaTerisi: { increment: 1 } },
    });
  }
}
