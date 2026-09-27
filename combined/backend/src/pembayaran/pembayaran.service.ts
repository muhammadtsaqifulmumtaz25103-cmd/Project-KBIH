import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PendaftaranService } from '../pendaftaran/pendaftaran.service';

@Injectable()
export class PembayaranService {
  constructor(
    private prisma: PrismaService,
    private pendaftaranService: PendaftaranService,
  ) {}

  // Endpoint callback dari payment gateway (Midtrans/Xendit).
  // Pada implementasi nyata, verifikasi signature/notification token dari gateway di sini
  // sebelum mempercayai payload (lihat Bagian 9 - Keamanan pada blueprint).
  async handleCallback(payload: {
    pembayaranId: string;
    statusBayar: 'PAID' | 'FAILED' | 'EXPIRED';
    metode?: string;
    referensiExternal?: string;
  }) {
    const pembayaran = await this.prisma.pembayaran.findUnique({
      where: { id: payload.pembayaranId },
    });
    if (!pembayaran) throw new NotFoundException('Data pembayaran tidak ditemukan');

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
}
