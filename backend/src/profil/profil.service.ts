import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilService {
  constructor(private prisma: PrismaService) {}

  // Publik: profil & penjelasan balai pelatihan (Modul 5 pada blueprint)
  async findProfil() {
    const profil = await this.prisma.balaiProfil.findFirst({
      include: { galeri: true, benefit: true },
    });
    if (!profil) throw new NotFoundException('Profil balai belum diisi');
    return profil;
  }

  async update(id: string, data: Partial<{ namaBalai: string; sejarah: string; visiMisi: string; alamat: string; kontak: string }>) {
    return this.prisma.balaiProfil.update({ where: { id }, data });
  }

  addGaleri(balaiId: string, urlGambar: string, keterangan?: string) {
    return this.prisma.galeri.create({ data: { balaiId, urlGambar, keterangan } });
  }
}
