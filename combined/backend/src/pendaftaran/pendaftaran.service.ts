import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JadwalService } from '../jadwal/jadwal.service';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';

// Biaya pelatihan flat contoh — pada implementasi nyata bisa dibuat dinamis per jadwal
const BIAYA_PELATIHAN = 500000;

@Injectable()
export class PendaftaranService {
  constructor(
    private prisma: PrismaService,
    private jadwalService: JadwalService,
  ) {}

  // Mengikuti Sequence Diagram 6.3: cek kuota -> buat pendaftaran -> buat invoice
  async create(anggotaId: string, dto: CreatePendaftaranDto) {
    const anggota = await this.prisma.anggota.findUnique({ where: { id: anggotaId } });
    if (anggota.statusKeanggotaan !== 'AKTIF') {
      throw new BadRequestException(
        'Keanggotaan Anda belum aktif. Selesaikan verifikasi dokumen terlebih dahulu.',
      );
    }

    await this.jadwalService.cekKetersediaan(dto.jadwalId);

    const sudahDaftar = await this.prisma.pendaftaran.findUnique({
      where: { anggotaId_jadwalId: { anggotaId, jadwalId: dto.jadwalId } },
    });
    if (sudahDaftar) {
      throw new BadRequestException('Anda sudah terdaftar pada jadwal ini');
    }

    const pendaftaran = await this.prisma.pendaftaran.create({
      data: { anggotaId, jadwalId: dto.jadwalId, status: 'MENUNGGU_PEMBAYARAN' },
    });

    const pembayaran = await this.prisma.pembayaran.create({
      data: {
        pendaftaranId: pendaftaran.id,
        jumlah: BIAYA_PELATIHAN,
        statusBayar: 'PENDING',
      },
    });

    // NOTE: di implementasi nyata, panggil PaymentService (Midtrans/Xendit) di sini
    // untuk membuat invoice sungguhan dan mengembalikan redirect URL pembayaran.
    return {
      pendaftaranId: pendaftaran.id,
      pembayaranId: pembayaran.id,
      jumlah: pembayaran.jumlah,
      status: pendaftaran.status,
      pesan: 'Silakan lanjutkan ke halaman pembayaran.',
    };
  }

  findByAnggota(anggotaId: string) {
    return this.prisma.pendaftaran.findMany({
      where: { anggotaId },
      include: { jadwal: true, pembayaran: true },
      orderBy: { tanggalDaftar: 'desc' },
    });
  }

  async findOne(id: string) {
    const pendaftaran = await this.prisma.pendaftaran.findUnique({
      where: { id },
      include: { jadwal: true, pembayaran: true, anggota: true },
    });
    if (!pendaftaran) throw new NotFoundException('Pendaftaran tidak ditemukan');
    return pendaftaran;
  }

  // Dipanggil oleh PembayaranService setelah callback gateway sukses
  async konfirmasiSetelahBayar(pendaftaranId: string) {
    const pendaftaran = await this.prisma.pendaftaran.update({
      where: { id: pendaftaranId },
      data: { status: 'TERKONFIRMASI' },
    });
    await this.jadwalService.tambahKuotaTerisi(pendaftaran.jadwalId);
    return pendaftaran;
  }
}
