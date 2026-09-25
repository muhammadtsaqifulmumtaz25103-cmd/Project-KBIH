import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';

@Injectable()
export class KegiatanService {
  constructor(private prisma: PrismaService) {}

  // Publik: katalog kegiatan pelatihan (Modul 3 pada blueprint)
  findAll() {
    return this.prisma.kegiatan.findMany({ include: { kategori: true } });
  }

  async findOne(id: string) {
    const kegiatan = await this.prisma.kegiatan.findUnique({
      where: { id },
      include: { kategori: true },
    });
    if (!kegiatan) throw new NotFoundException('Kegiatan tidak ditemukan');
    return kegiatan;
  }

  // Admin/Pembina: input materi kegiatan (UC14)
  create(dto: CreateKegiatanDto) {
    return this.prisma.kegiatan.create({ data: dto });
  }

  findAllKategori() {
    return this.prisma.kategoriKegiatan.findMany();
  }
}
